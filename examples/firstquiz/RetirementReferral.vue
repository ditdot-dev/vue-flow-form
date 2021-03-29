<template>
  <div class="hello">
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
          <h1>asdasd</h1>
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
  LinkOption
} from "../../src/models/QuestionModel";
import LanguageModel from "../../src/models/LanguageModel";
import Vuex from "vuex";
import * as taxApi from "../../src/api/TaxApi";
import { userInputs, localUserInputs } from "../../src/constants/index";
import { firestore, USER_INPUTS, compareTwoObjects, TAX_SUMMARY } from "./util";
import { logging } from "@/utils/logging";
export default {
  name: "RetirementReferral",
  components: {
    FlowForm
  },
  data() {
    return {
      submitted: false,
      completed: false,
      language: new LanguageModel(),
      questions: [
        new QuestionModel({
          id: "tax_filing_state",
          tagline: "About You",
          intro: true,
          title: "What is your tax filing state?",
          personalizedAnswerMessages: true, // Use this prop if you need to populate personalized answer messages
          answer: localUserInputs()?.tax_filing_state,
          answered: localUserInputs()?.tax_filing_state ? true : false,
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
              value: "al"
            }),
            new ChoiceOption({
              label: "Alaska",
              value: "ak",
              answerMessage: "🎉 You have no state income tax!"
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
              value: "ca",
              answerMessage: "🚀 the state with the most freelancers!"
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
              label: "District of Columbia",
              value: "dc"
            }),
            new ChoiceOption({
              label: "Florida",
              value: "fl",
              answerMessage: "🎉 You have no state income tax!"
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
              value: "nv",
              answerMessage: "🎉 You have no state income tax!"
            }),
            new ChoiceOption({
              label: "New Hampshire",
              value: "nh",
              answerMessage: "🎉 You have no state income tax!"
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
              value: "ny",
              answerMessage: "🗽 our team is based here too!"
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
              value: "sd",
              answerMessage: "🎉 You have no state income tax!"
            }),
            new ChoiceOption({
              label: "Tennessee",
              value: "tn",
              answerMessage: "🎉 You have no state income tax!"
            }),
            new ChoiceOption({
              label: "Texas",
              value: "tx",
              answerMessage: "🎉 You have no state income tax!"
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
              value: "wa",
              answerMessage: "🎉 You have no state income tax!"
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
              value: "wy",
              answerMessage: "🎉 You have no state income tax!"
            })
          ]
        }),
        new QuestionModel({
          id: "tax_filing_status",
          tagline: "About You",
          title: "What is your tax filing status?",
          personalizedAnswerMessages: true,
          type: QuestionType.Dropdown,
          answer: localUserInputs()?.tax_filing_status,
          answered: localUserInputs()?.tax_filing_status ? true : false,
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
              answerMessage: "Got it! 💪"
            }),
            new ChoiceOption({
              label: "Head of Household",
              value: "headOfHousehold",
              answerMessage: "Nice! 🏠"
            }),
            new ChoiceOption({
              label: "Married Filing Jointly",
              value: "married",
              answerMessage:
                "Got it! We will assume your partner is not making any contributions"
            }),
            new ChoiceOption({
              label: "Married Filing Separately",
              value: "marriedFilingSeparately",
              answerMessage:
                "Got it! We will assume your partner's finances are separate from yours"
            })
          ]
        }),
        new QuestionModel({
          id: "dependents",
          answerMessage: "😊",
          tagline: "About You",
          title: "How many dependents do you have?",
          answer: localUserInputs()?.dependents,
          type: QuestionType.Number,
          answered: localUserInputs()?.dependents ? true : false,
          required: true,
          mask: "#",
          placeholder: "Type a number here...",
          tooltip:
            "This information is used to add up the tax deductions available to you. Put the number of individuals who are dependent on your income."
        }),
        new QuestionModel({
          id: "business_name",
          tagline: "About Your Business",
          title: "What is your business name?",
          answerMessage: "That's a cool name 😎",
          type: QuestionType.LongText,
          answer: localUserInputs()?.business_name,
          answered: localUserInputs()?.business_name ? true : false,
          required: true,
          helpTextShow: false,
          placeholder: "The name of my business is...",
          tooltip:
            "This information is used so we can identify your work by the name you refer to it by. This can be your Doing Business As (DBA) or your full name if you have not incorporated the business in any form."
        }),
        new QuestionModel({
          id: "entity",
          tagline: "About Your Business",
          title: "What is your business legal entity?",
          personalizedAnswerMessages: true,
          type: QuestionType.Dropdown,
          answer: localUserInputs()?.entity,
          answered: localUserInputs()?.entity ? true : false,
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
                "The most common type of business, a sole proprietor is someone who owns an unincorporated business by himself or herself."
            }),
            new ChoiceOption({
              label: "Partnership",
              value: "partnership",
              answerMessage:
                "A partnership is the relationship between two or more people to do trade or business. Each person contributes money, property, labor or skill, and shares in the profits and losses of the business. 🤝"
            }),
            new ChoiceOption({
              label: "S-Corporation",
              value: "sCorporation",
              answerMessage:
                "S corporations are corporations that elect to pass corporate income, losses, deductions, and credits through to their shareholders for federal tax purposes. Next, we'll check how much you pay yourself!"
            }),
            new ChoiceOption({
              label: "LLC (Limited Liability Company)",
              value: "llc",
              answerMessage:
                "A Limited Liability Company (LLC) is a business structure that is a hybrid between a corporation & sole-proprietor, whereby the owner is not personally liable for the entity's debts or liabilities. Next, we'll check how much you pay yourself!"
            })
          ]
          // jump: {
          //   llc: "salary",
          //   sCorporation: "salary",
          //   soleProprietor: "employee_count",
          //   partnership: "employee_count",
          // },
        }),

        new QuestionModel({
          id: "employee_count",
          tagline: "About Your Business",
          title: "How many full-time employees do you have?",
          personalizedAnswerMessages: true, // Use this prop if you need to populate personalized answer messages
          type: QuestionType.Dropdown,
          answer: localUserInputs()?.employee_count || "",
          answered: localUserInputs()?.employee_count ? true : false,
          multiple: false,
          subtitle: "Do not count yourself and/or your spouse",
          placeholder: "The number is...",
          inline: false,
          required: true,
          tooltip:
            "This information is used to determine the type of retirement accounts you are eligible for. Don’t count yourself or your spouse as a full-time employee, or any employees who have ownership stake in the business. If you are not sure, refer to the FAQ for what qualifies as a full-time employee in your state.",
          options: [
            new ChoiceOption({
              label: "Just myself!",
              value: "noEmployees",
              answerMessage: "Keep up the great work as a one-person shop!"
            }),
            new ChoiceOption({
              label: "1-99",
              value: "lessthan100",
              answerMessage: "Thank you for hiring employees!"
            }),
            new ChoiceOption({
              label: "100+",
              value: "100plus",
              answerMessage:
                "Wow! Your business is likely too big for this calculator, we can help you find a professional"
            })
          ]
        }),
        new QuestionModel({
          id: "salary",
          tagline: "About Your Business",
          title: "What is the annual income you set for yourself?",
          answerMessage: {
            checkbox: "Good work investing back into the business! 💡",
            answer: "it's good to pay yourself first! 🤩"
          },
          answer: localUserInputs()?.salary || "",
          answered: (localUserInputs()?.salary || localUserInputs().first_name
          ? true
          : false)
            ? true
            : false,
          type: QuestionType.Salary,
          placeholder: "Type a number here...",
          required: true,
          checkboxText: "I don't pay myself an income",
          checkbox: localUserInputs().first_name
            ? localUserInputs()?.salary
              ? false
              : true
            : false,
          tooltip:
            "This is the amount that you have set as a “reasonable salary” when you put yourself on payroll as a full-time owner-employee. This will depend on your industry and work performed. We can help you calculate this if you want."
        }),
        new QuestionModel({
          id: "expenses",
          tagline: "About Your Business",
          title: "How much are your business expenses this year?",
          subtitle:
            "This can include office supplies, rent, software subscriptions, work travel, and more. If you provided your salary earlier, please add it here as a wage expense.",
          answerMessage: "Keeping track of it all isn't easy! 💸",
          placeholder: "Type a number here...",
          type: QuestionType.Dollar,
          answer: localUserInputs()?.expenses || "",
          dollar: localUserInputs()?.expenses || "",
          answered: localUserInputs()?.expenses ? true : false,

          required: true,
          tooltip:
            "This is the annual expenses for your business to operate. Please put the amount you forecast the business will spend this year. You can find last year's total expenses on your tax return's Schedule C box 28."
        }),
        new QuestionModel({
          id: "income",
          tagline: "About Your Business",
          title: "How much does your business make in a year?",
          answerMessage: "You did it, amazing work! 💰",
          placeholder: "Type a number here...",
          type: QuestionType.Dollar,
          answer: localUserInputs()?.income || "",
          answered: localUserInputs()?.income ? true : false,
          required: true,
          tooltip:
            "This is the income generated by your business every year. Please put the amount you forecast the business will generate by end of the year. This includes all the invoices and cash payments you’ve received under your business entity."
        }),
        new QuestionModel({
          answerMessage: "Hello!",
          tagline: "About You",
          id: "first_name",
          title: "What's your first name?",
          type: QuestionType.Text,
          answer: localUserInputs()?.first_name,
          answered: localUserInputs()?.first_name ? true : false,
          required: true,
          end_index: "age",
          tooltip:
            "This tooltip is available on every question to explain why the question is asked. In this case, your name is used to help personalize the results later. 😊"
        }),
        new QuestionModel({
          answerMessage: "That's a great age to be!",
          tagline: "About You",
          id: "age",
          index_id: "first_name",
          title: "What is your age?",
          type: QuestionType.Number,
          answer: localUserInputs()?.age || "",
          answered: localUserInputs()?.age ? true : false,
          required: true,
          mask: "##",
          placeholder: "Type a number here...",
          tooltip:
            "This information is used to calculate your potential retirement earnings at age 67. Please put your current age, or the age you will be after December 31, 2020."
        })
      ]
    };
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyListener);
    logging("mount");
    this.$forceUpdate();
  },
  created() {
    logging("create");
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
      try {
        this.$refs.flowform.submitted = true;
        this.submitted = true;
        /* Set the data inputs for an object for Track tax api */
        await this.getData();
        const userInput = await this.formatData();

        if (
          userInput.entity === "soleProprietor" ||
          userInput.entity === "partnership"
        ) {
          userInput.salary = "";
        }
        const isEqual = compareTwoObjects(localUserInputs(), userInput);
        let firestoreIds = { userInput: "", taxUpdate: "" };
        await logging(isEqual);
        if (!isEqual || !Object.keys(localUserInputs()).length) {
          const db = await firestore.collection(USER_INPUTS).add({
            ...userInput
          });
          firestoreIds.userInput = db.id;
          userInput.user_input_id = db.id;
        }
        this.$store.commit("userInformation/entry", userInput);
        const incomeData = await taxApi.taxData();

        /* Run taxApi and put the outputs into an object in Vuex store */
        const taxUpdate = await taxApi.postTaxData(incomeData);
        await logging(taxUpdate.data);
        /* Run dispatch to store the data for Results.vue */

        await this.$store.commit("userInformation/results", {
          ...taxUpdate.data,
          user_input_id: firestoreIds.userInput
        });
        await this.$store.dispatch("userInformation/getTaxSummary");
        if (firestoreIds.userInput) {
          const db = await firestore.collection(TAX_SUMMARY).add({
            ...this.taxSummary,
            user_input_id: firestoreIds.userInput
          });
          firestoreIds.taxSummary = db.id;
        }
      } catch (error) {
        await logging(error, true);
      }
    },
    getData() {
      window.data = {
        questions: [],
        answers: [],
        id: []
      };
      this.questions.forEach(question => {
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
    }
  },
  computed: {
    ...Vuex.mapState("userInformation", {
      userInput: state => state.userInput,
      taxSummary: state => state.taxSummary
    })
  }
};
</script>

<style lang="css">
@import "../../src/assets/css/themes/theme-green.css";
</style>
