<template>
  <div>
    <router-view />

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
// Use this prop if you need to populate personalized answer messages.
// personalizedAnswerMessages: BOOLEAN
import FlowForm from "../../src/components/FlowForm.vue";
import QuestionModel, {
  QuestionType,
  ChoiceOption,
  LinkOption,
} from "../../src/models/QuestionModel";
import LanguageModel from "../../src/models/LanguageModel";
import Vuex from "vuex";
import * as taxApi from "../../src/api/TaxApi";
export default {
  name: "RetirementReferral",
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
          tooltip:
            "This tooltip is available on every question to explain why the question is asked. In this case, your name is used to help personalize the results later. 😊",
        }),
        new QuestionModel({
          answerMessage: "That's a great age to be!",
          tagline: "About You",
          id: "age",
          title: "What is your age?",
          type: QuestionType.Number,
          required: true,
          mask: "##",
          placeholder: "Type a number here...",
          tooltip:
            "This information is used to calculate your potential retirement earnings at age 67. Please put your current age, or the age you will be after December 31, 2020.",
        }),
        new QuestionModel({
          id: "tax_filing_status",
          tagline: "About You",
          title: "What is your tax filing status?",
          personalizedAnswerMessages: true,
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: "Select status",
          inline: false,
          required: true,
          tooltip:
            "This information is used to identify your household tax deductions (standard, not itemized). Please put your marital status as recognized by the IRS.",
          options: [
            new ChoiceOption({
              label: "Single",
              value: "single",
              answerMessage: "Got it! 💪",
            }),
            new ChoiceOption({
              label: "Head of Household",
              value: "headOfHousehold",
              answerMessage: "Nice! 🏠",
            }),
            new ChoiceOption({
              label: "Married Filing Jointly",
              value: "married",
              answerMessage:
                "Got it! We will assume your partner is not making any contributions",
            }),
            new ChoiceOption({
              label: "Married Filing Separately",
              value: "marriedFilingSeparately",
              answerMessage:
                "Got it! We will assume your partner's finances are separate from yours",
            }),
          ],
        }),
        new QuestionModel({
          id: "dependents",
          answerMessage: "😊",
          tagline: "About You",
          title: "How many dependents do you have?",
          type: QuestionType.Number,
          required: true,
          mask: "#",
          placeholder: "Type a number here...",
          tooltip:
            "This information is used to add up the tax deductions available to you. Put the number of individuals who are dependent on your income.",
        }),
        new QuestionModel({
          id: "tax_filing_state",
          tagline: "About You",
          title: "What is your tax filing state?",
          answerMessage: "Next let's move onto your business!",
          personalizedAnswerMessages: true,
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: "Select state",
          inline: false,
          required: true,
          tooltip:
            "This information is used to identify the state tax liability. Please put the state you will be filing with this year. If you have been moving due to COVID-19, put the state of your primary residence and where you’ve been conducting business from.",
          options: [
            new ChoiceOption({
              label: "Alabama",
              value: "al",
            }),
            new ChoiceOption({
              label: "Alaska",
              value: "ak",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "Arizona",
              value: "az",
            }),
            new ChoiceOption({
              label: "Arkansas",
              value: "ar",
            }),
            new ChoiceOption({
              label: "California",
              value: "ca",
              answerMessage: "🚀 the state with the most freelancers!",
            }),
            new ChoiceOption({
              label: "Colorado",
              value: "co",
            }),
            new ChoiceOption({
              label: "Conneticut",
              value: "ct",
            }),
            new ChoiceOption({
              label: "Delaware",
              value: "de",
            }),
            new ChoiceOption({
              label: "Florida",
              value: "fl",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "Georgia",
              value: "ga",
            }),
            new ChoiceOption({
              label: "Hawaii",
              value: "hi",
            }),
            new ChoiceOption({
              label: "Idaho",
              value: "id",
            }),
            new ChoiceOption({
              label: "Illinois",
              value: "il",
            }),
            new ChoiceOption({
              label: "Indiana",
              value: "in",
            }),
            new ChoiceOption({
              label: "Iowa",
              value: "ia",
            }),
            new ChoiceOption({
              label: "Kansas",
              value: "ks",
            }),
            new ChoiceOption({
              label: "Kentucky",
              value: "ky",
            }),
            new ChoiceOption({
              label: "Louisiana",
              value: "la",
            }),
            new ChoiceOption({
              label: "Maine",
              value: "me",
            }),
            new ChoiceOption({
              label: "Maryland",
              value: "md",
            }),
            new ChoiceOption({
              label: "Massachusetts",
              value: "ma",
            }),
            new ChoiceOption({
              label: "Michigan",
              value: "mi",
            }),
            new ChoiceOption({
              label: "Minnesota",
              value: "mn",
            }),
            new ChoiceOption({
              label: "Mississippi",
              value: "ms",
            }),
            new ChoiceOption({
              label: "Missouri",
              value: "mo",
            }),
            new ChoiceOption({
              label: "Montana",
              value: "mt",
            }),
            new ChoiceOption({
              label: "Nebraska",
              value: "ne",
            }),
            new ChoiceOption({
              label: "Nevada",
              value: "nv",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "New Hampshire",
              value: "nh",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "New Jersey",
              value: "nj",
            }),
            new ChoiceOption({
              label: "New Mexico",
              value: "nm",
            }),
            new ChoiceOption({
              label: "New York",
              value: "ny",
              answerMessage: "🗽 our team is based here too!",
            }),
            new ChoiceOption({
              label: "North Carolina",
              value: "nc",
            }),
            new ChoiceOption({
              label: "North Dakota",
              value: "nd",
            }),
            new ChoiceOption({
              label: "Ohio",
              value: "oh",
            }),
            new ChoiceOption({
              label: "Oklahoma",
              value: "ok",
            }),
            new ChoiceOption({
              label: "Oregon",
              value: "or",
            }),
            new ChoiceOption({
              label: "Pennsylvania",
              value: "pa",
            }),
            new ChoiceOption({
              label: "Rhode Island",
              value: "ri",
            }),
            new ChoiceOption({
              label: "South Carolina",
              value: "sc",
            }),
            new ChoiceOption({
              label: "South Dakota",
              value: "sd",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "Tennessee",
              value: "tn",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "Texas",
              value: "tx",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "Utah",
              value: "ut",
            }),
            new ChoiceOption({
              label: "Vermont",
              value: "vt",
            }),
            new ChoiceOption({
              label: "Virginia",
              value: "va",
            }),
            new ChoiceOption({
              label: "Washington",
              value: "wa",
              answerMessage: "🎉 You have no state income tax!",
            }),
            new ChoiceOption({
              label: "Washington District of Columbia",
              value: "dc",
            }),
            new ChoiceOption({
              label: "West Virginia",
              value: "wv",
            }),
            new ChoiceOption({
              label: "Wisconsin",
              value: "wi",
            }),
            new ChoiceOption({
              label: "Wyoming",
              value: "wy",
              answerMessage: "🎉 You have no state income tax!",
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
          tooltip:
            "This information is used so we can identify your work by the name you refer to it by. This can be your Doing Business As (DBA) or your full name if you have not incorporated the business in any form.",
        }),
        new QuestionModel({
          id: "entity",
          tagline: "About Your Business",
          title: "What is your business legal entity?",
          personalizedAnswerMessages: true,
          type: QuestionType.Dropdown,
          multiple: false,
          placeholder: "Select legal entity",
          inline: false,
          required: true,
          tooltip:
            "This information is used to determine your tax legal status and treatment by the IRS. If you have not incorporated your business yet, you are operating as a sole-proprietor.",
          options: [
            new ChoiceOption({
              label: "Sole Proprietorship",
              value: "soleProprietor",
              answerMessage:
                "The most common type of business, with over 23 million sole proprietors in the US!",
            }),
            new ChoiceOption({
              label: "Partnership",
              value: "partnership",
              answerMessage: "Nice work getting partner(s)! 🤝",
            }),
            new ChoiceOption({
              label: "S-Corporation",
              value: "sCorporation",
              answerMessage:
                "Nice work incorporating, we'll ask about your salary next",
            }),
            new ChoiceOption({
              label: "LLC (Limited Liability Company)",
              value: "llc",
              answerMessage:
                "Nice work incorporating, we'll ask about your salary next",
            }),
          ],
          jump: {
            llc: "salary",
            sCorporation: "salary",
            soleProprietor: "employee_count",
            partnership: "employee_count",
          },
        }),
        new QuestionModel({
          id: "salary",
          tagline: "About Your Business",
          title: "What is the annual income you set for yourself?",
          answerMessage: {
            checkbox: "Good work investing back into the business! 💡",
            answer: "it's good to pay yourself first! 🤩",
          },
          type: QuestionType.Salary,
          placeholder: "Type a number here...",
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
          personalizedAnswerMessages: true, // Use this prop if you need to populate personalized answer messages
          type: QuestionType.Dropdown,
          multiple: false,
          subtitle: "Do not count yourself and/or your spouse",
          placeholder: "The number is...",
          inline: false,
          required: true,
          tooltip:
            "This information is used to determine the type of retirement accounts you are eligible for. Don’t count yourself or your spouse as a full-time employee, or any employees who have ownership stake in the business. If you are not sure, refer to the FAQ for what qualifies as a full-time employee in your state.",
          options: [
            new ChoiceOption({
              label: "0",
              value: "noEmployees",
              answerMessage: "Keep up the great work as a one-person shop!",
            }),
            new ChoiceOption({
              label: "1-99",
              value: "lessthan100",
              answerMessage: "Thank you for hiring employees!",
            }),
            new ChoiceOption({
              label: "100+",
              value: "100plus",
              answerMessage:
                "Wow! Your business is likely too big for this calculator, we can help you find a professional",
            }),
          ],
        }),
        new QuestionModel({
          id: "expenses",
          tagline: "About Your Business",
          title: "How much are your business expenses this year?",
          subtitle:
            "If you pay yourself a salary, do not count that expense here",
          answerMessage: "Keeping track of it all isn't easy! 💸",
          placeholder: "Type a number here...",
          type: QuestionType.Dollar,
          required: true,
          tooltip:
            "This is the annual expenses for your business to operate. Please put the amount you forecast the business will spend this year. This can include office supplies, rent, software subscriptions, work travel, and more.",
        }),
        new QuestionModel({
          id: "income",
          tagline: "About Your Business",
          title: "How much does your business make in a year?",
          answerMessage: "You did it, amazing work! 💰",
          placeholder: "Type a number here...",
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
      await this.getData();
      const userInput = await this.formatData();
      localStorage.setItem("userInput", JSON.stringify(userInput));
      this.$store.commit("userInformation/entry", userInput);
      const incomeData = await taxApi.taxData();

      /* Run taxApi and put the outputs into an object in Vuex store */
      const taxUpdate = await taxApi.postTaxData(incomeData);
      console.log(taxUpdate.data);
      /* Run dispatch to store the data for Results.vue */

      await this.$store.commit("userInformation/results", taxUpdate.data);
      this.$store.dispatch("userInformation/getTaxSummary");
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
      const userInput = {};
      data.id.forEach((key, i) => (userInput[key] = data.answers[i]));
      return userInput;
    },
  },
};
</script>

<style lang="css">
@import "../../src/assets/css/themes/theme-green.css";
</style>
