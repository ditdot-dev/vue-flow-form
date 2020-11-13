<template>
  <div>
    <div id="nav" style="text-align: center">
      <button>
        <router-link to="/results">Results</router-link>
      </button>
      <router-view />
    </div>
    <flow-form
      ref="flowform"
      v-on:complete="onComplete"
      v-on:submit="onSubmit"
      v-bind:questions="questions"
      v-bind:language="language"
      v-bind:standalone="true"
    >
      <!-- Custom content for the Complete/Submit screen slots in the FlowForm component -->
      <!-- We've overriden the default "complete" slot content -->
      <template v-slot:complete>
        <div class="f-section-wrap">
          <p>
            <span class="fh2">Thank you. 🙏</span>
            <span class="f-section-text">
              Great work, please wait while we calculate your results. You can
              review your answers or press submit.
            </span>
          </p>
          <p class="f-description">
            Note: No data will be saved and/or sent in this calculator.
          </p>
        </div>
      </template>

      <!-- We've overriden the default "completeButton" slot content -->
      <template v-slot:completeButton>
        <div class="f-submit" v-if="!submitted">
          <button
            class="o-btn-action"
            ref="button"
            type="submit"
            href="#"
            v-on:click.prevent="onSendData()"
            aria-label="Press to submit"
          >
            <span>{{ language.submitText }}</span>
          </button>
          <a
            class="f-enter-desc"
            href="#"
            v-on:click.prevent="onSendData()"
            v-html="language.formatString(language.pressEnter)"
          >
          </a>
        </div>

        <p class="text-success" v-if="submitted">Submitted succesfully.</p>
      </template>
    </flow-form>
  </div>
</template>

<script>
import FlowForm from "../../src/components/FlowForm.vue";
import QuestionModel, {
  QuestionType,
  ChoiceOption,
  LinkOption,
} from "../../src/models/QuestionModel";
import LanguageModel from "../../src/models/LanguageModel";
import * as SMETaxCalculations from "../../src/models/SMETaxCalculations";
import * as taxApi from "../../src/models/TaxApi";
import * as MoveObjects from "../../src/models/MoveObjects";
export default {
  name: "example",
  components: {
    FlowForm,
  },
  data() {
    return {
      submitted: false,
      completed: false,
      language: new LanguageModel(),
      questions: [
        new QuestionModel({
          answerMessage: "Hello!",
          tagline: "About You",
          id: "first_name",
          title: "What's your first name?",
          type: QuestionType.Text,
          required: true,
          tooltip: "This tooltip is available on every question to explain why the question is asked. In this case, your name is used to help personalize the results later. 😊",
        }),
        new QuestionModel({
          answerMessage: "That's great age to be!",
          tagline: "About You",
          id: "age",
          title: "What is your age?",
          type: QuestionType.Number,
          required: true,
          mask: "##",
          placeholder: 'Type a number here...',
          tooltip: "This information is used to calculate your potential retirement earnings at age 67. Please put your current age, or the age you will be after December 31, 2020.",
        }),
        new QuestionModel({
          id: "dependents",
          answerMessage: "Great!",
          tagline: "About You",
          title: "How many dependents do you have?",
          type: QuestionType.Number,
          required: true,
          mask: "#",
          placeholder: 'Type a number here...',
          tooltip: "This information is used to add up the tax deductions available to you. Put the number of individuals who are dependent on your income.",
        }),
        new QuestionModel({
          id: "tax_filing_state",
          tagline: "About You",
          title: "What is your tax filing state?",
          answerMessage: "Great!",
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: "Select state",
          inline: false,
          required: true,
          tooltip: "This information is used to identify the state tax liability. Please put the state you will be filing with this year. If you have been moving due to COVID-19, put the state of your primary residence and where you’ve been conducting business from.",
          options: [
            new ChoiceOption({
              label: "Alabama",
              value: "al"
            }),
            new ChoiceOption({
              label: "Alaska",
              value: "ak"
            }),
            new ChoiceOption({
              label: "Arizona",
              value: "az"
            }),
            new ChoiceOption({
              label: "Arkansas",
              value: "ar"
            }),
            new ChoiceOption({
              label: "California",
              value: "ca"
            }),
            new ChoiceOption({
              label: "Colorado",
              value: "co"
            }),
            new ChoiceOption({
              label: "Conneticut",
              value: "ct"
            }),
            new ChoiceOption({
              label: "Delaware",
              value: "de"
            }),
            new ChoiceOption({
              label: "Florida",
              value: "fl"
            }),
            new ChoiceOption({
              label: "Georgia",
              value: "ga"
            }),
            new ChoiceOption({
              label: "Hawaii",
              value: "hi"
            }),
            new ChoiceOption({
              label: "Idaho",
              value: "id"
            }),
            new ChoiceOption({
              label: "Illinois",
              value: "il"
            }),
            new ChoiceOption({
              label: "Indiana",
              value: "in"
            }),
            new ChoiceOption({
              label: "Iowa",
              value: "ia"
            }),
            new ChoiceOption({
              label: "Kansas",
              value: "ks"
            }),
            new ChoiceOption({
              label: "Kentucky",
              value: "ky"
            }),
            new ChoiceOption({
              label: "Louisiana",
              value: "la"
            }),
            new ChoiceOption({
              label: "Maine",
              value: "me"
            }),
            new ChoiceOption({
              label: "Maryland",
              value: "md"
            }),
            new ChoiceOption({
              label: "Massachusetts",
              value: "ma"
            }),
            new ChoiceOption({
              label: "Michigan",
              value: "mi"
            }),
            new ChoiceOption({
              label: "Minnesota",
              value: "mn"
            }),
            new ChoiceOption({
              label: "Mississippi",
              value: "ms"
            }),
            new ChoiceOption({
              label: "Missouri",
              value: "mo"
            }),
            new ChoiceOption({
              label: "Montana",
              value: "mt"
            }),
            new ChoiceOption({
              label: "Nebraska",
              value: "ne"
            }),
            new ChoiceOption({
              label: "Nevada",
              value: "nv"
            }),
            new ChoiceOption({
              label: "New Hampshire",
              value: "nh"
            }),
            new ChoiceOption({
              label: "New Jersey",
              value: "nj"
            }),
            new ChoiceOption({
              label: "New Mexico",
              value: "nm"
            }),
            new ChoiceOption({
              label: "New York",
              value: "ny"
            }),
            new ChoiceOption({
              label: "North Carolina",
              value: "nc"
            }),
            new ChoiceOption({
              label: "North Dakota",
              value: "nd"
            }),
            new ChoiceOption({
              label: "Ohio",
              value: "oh"
            }),
            new ChoiceOption({
              label: "Oklahoma",
              value: "ok"
            }),
            new ChoiceOption({
              label: "Oregon",
              value: "or"
            }),
            new ChoiceOption({
              label: "Pennsylvania",
              value: "pa"
            }),
            new ChoiceOption({
              label: "Rhode Island",
              value: "ri"
            }),
            new ChoiceOption({
              label: "South Carolina",
              value: "sc"
            }),
            new ChoiceOption({
              label: "South Dakota",
              value: "sd"
            }),
            new ChoiceOption({
              label: "Tennessee",
              value: "tn"
            }),
            new ChoiceOption({
              label: "Texas",
              value: "tx"
            }),
            new ChoiceOption({
              label: "Utah",
              value: "ut"
            }),
            new ChoiceOption({
              label: "Vermont",
              value: "vt"
            }),
            new ChoiceOption({
              label: "Virginia",
              value: "va"
            }),
            new ChoiceOption({
              label: "Washington",
              value: "wa"
            }),
            new ChoiceOption({
              label: "Washington District of Columbia",
              value: "dc",
            }),
            new ChoiceOption({
              label: "West Virginia",
              value: "wv"
            }),
            new ChoiceOption({
              label: "Wisconsin",
              value: "wi"
            }),
            new ChoiceOption({
              label: "Wyoming",
              value: "wy"
            }),
          ],
        }),
        new QuestionModel({
          id: "tax_filing_status",
          tagline: "About You",
          title: "What is your tax filing status?",
          answerMessage: "Great!",
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: "Select status",
          inline: false,
          required: true,
          tooltip: "This information is used to identify your household tax deductions. Please put your marital status as recognized by the IRS.",
          options: [
            new ChoiceOption({
              label: "Single",
              value: "single",
            }),
            new ChoiceOption({
              label: "Head of Household",
              value: "headOfHousehold",
            }),
            new ChoiceOption({
              label: "Married Filing Jointly",
              value: "married",
            }),
            new ChoiceOption({
              label: "Married Filing Separately",
              value: "marriedFilingSeparately",
            }),
          ],
        }),
        new QuestionModel({
          id: "business_name",
          tagline: "About Your Business",
          title: "What is your business name?",
          answerMessage: "That's a cool name 😎",
          type: QuestionType.LongText,
          required: true,
          helpTextShow: false,
          placeholder: "The name of my business is...",
          tooltip: "This information is used so we can identify your work by the name you refer to it by. This can be your Doing Business As (DBA) or your full name if you have not incorporated the business in any form.",
        }),
        new QuestionModel({
          id: "entity",
          tagline: "About Your Business",
          title: "What is your business legal entity?",
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: "Select legal entity",
          inline: false,
          required: true,
          tooltip: "This information is used to determine your tax legal status and treatment by the IRS. If you have not incorporated your business yet, you are operating as a sole-proprietor.",
          options: [
            new ChoiceOption({
              label: "Sole Proprietorship",
              value: "soleProprietor",
            }),
            new ChoiceOption({
              label: "Partnership",
              value: "partnership",
            }),
            new ChoiceOption({
              label: "S-Corporation",
              value: "sCorporation",
            }),
            new ChoiceOption({
              label: "LLC (Limited Liability Company)",
              value: "llc",
            }),
          ],
        }),
        new QuestionModel({
          id: "salary",
          tagline: "About Your Business",
          title: "What is the annual income you set for yourself?",
          answerMessage: "Great job!",
          type: QuestionType.Salary,
          required: true,
          checkboxText: "I don't pay myself an income",
          checkbox: false,
          tooltip:
            "This is the amount that you have set as a “reasonable salary” when you put yourself on payroll as a full-time owner-employee. This will depend on your industry and work performed. We can help you calculate this if you want.",
        }),
        new QuestionModel({
           id: "employee_count",
           tagline: "About Your Business",
           title: "How many full-time employees do you have?",
           answerMessage: "Nice!",
           type: QuestionType.Dropdown,
           multiple: false,
           subtitle: "Do not count yourself or your spouse",
           placeholder: "0",
           inline: false,
           required: true,
           tooltip: "This information is used to determine the type of retirement accounts you are eligible for. Don’t count yourself or your spouse as a full-time employee, or any employees who have ownership stake in the business. If you are not sure, refer to the FAQ for what qualifies as a full-time employee in your state.",
           options: [
             new ChoiceOption({
               label: "0",
               value: "noEmployees",
             }),
             new ChoiceOption({
               label: "1-99",
               value: "lessthan100",
             }),
             new ChoiceOption({
               label: "100+",
               value: "100plus",
             }),
           ],
         }),
        new QuestionModel({
          id: "expenses",
          tagline: "About Your Business",
          title: "How much are your business expenses this year?",
          answerMessage: "That's great!",
          type: QuestionType.Dollar,
          required: true,
          tooltip:
            "This is expenses that your business has every year. Please put the amount you forecast the business will spend. This can include office supplies, software subscriptions, work travel and more.",
        }),
        new QuestionModel({
          id: "income",
          tagline: "About Your Business",
          title: "How much does your business make in a year?",
          answerMessage: "That's great!",
          type: QuestionType.Dollar,
          required: true,
          tooltip:
            "This is the income generated by your business every year. Please put the amount you forecast the business will generate by end of the year. This includes all the invoices and cash payments you’ve received under your business entity.",
        }),
      ],
    };
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyListener);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyListener);
  },
  methods: {
    onKeyListener($event) {
      // We've overriden the default "complete" slot so
      // we need to implement the "keyup" listener manually.
      if ($event.key === "Enter" && this.completed && !this.submitted) {
        this.onSendData();
      }
    },
    /* eslint-disable-next-line no-unused-vars */
    onComplete(completed, questionList) {
      // This method is called whenever the "completed" status is changed.
      this.completed = completed;
      console.log(completed, questionList);
    },
    onSubmit(questionList) {
      // This method will only be called if you don't override the
      // completeButton slot.
      this.onSendData();
    },

    async onSendData() {
      this.$refs.flowform.submitted = true;
      this.submitted = true;

      /* Set the data inputs for an object for Track tax api */

      window.data = await this.getData();
      window.incomeData = await this.formatData();
      window.userData = await this.formatUserData();
      console.log(data);
      console.log(incomeData);
      console.log(userData);

      await taxApi.postTaxData(incomeData);
      console.log(taxUpdate);
      await MoveObjects.postResults();

      async function postData() {
        // await setTaxInput();
        // await postTaxData(incomeData);
      }
      /* Put the data outputs into an object */

      /* Translate the object with outputs into Results.vue */
      /*
                  async function postTaxData(incomeData){
                  let baseTax = await (fetch (tax_calculation, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key": app_key,
                        "X-Api-Secret": app_secret,},
                    method: "PUT",
                    body: JSON.stringify(incomeData)
                  }).catch(handleError));
                  window.taxUpdate = await baseTax.json();
                  console.log("base tax calculation complete!");}

                fetch(url, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(incomeData)
                })

      */
    },

    getData() {
      window.data = {
        questions: [],
        answers: [],
        id: [],
      };

      this.questions.forEach((question) => {
        if (question.title) {
          data.questions.push(question.title);
          data.answers.push(question.answer);
          data.id.push(question.id);
        }
      });
      return data;
    },

    formatData() {
      const incomeData = {
        taxes: {
          "1099Income": parseInt(data.answers[10]),
          expenseDeduction: parseInt(data.answers[9]),
          w2Income: parseInt(data.answers[7]),
          filingState: data.answers[3],
          filingStatus: data.answers[4],
          dependents: parseInt(data.answers[2]),
        },
      };
      return incomeData;
    },
    formatUserData() {
      const userData = {
        first_name: data.answers[0],
        age: data.answers[1],
        business_name: data.answers[5],
        entity: data.answers[6],
        employee_count: data.answers[8],
      };
      return userData;
    },
  },
};
</script>

<style lang="css">
@import "../../src/assets/css/themes/theme-green.css";
</style>
