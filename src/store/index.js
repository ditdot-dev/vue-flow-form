import Vue from "vue";
import Vuex from "vuex";
import * as TaxApi from "../models/TaxApi.js"
import * as SMETaxCalculations from "../models/SMETaxCalculations.js"

Vue.use(Vuex);

const userInformation = {
  namespaced: true,
  state: {
    "2020TaxTable": {
      single_deduction: 12400,
      married_deduction: 24800,
      married_filing_separately_deduction: 12400,
      head_of_household_deduction: 18650,
      single_tax_bracket: {
      // taxRate: [lowestAmount, highestAmount, rate (in decimal), taxDue]
        "10%": [0, 9875, 0.1, 0],
        "12%": [9876, 40125, 0.12, 987.50],
        "22%": [40126,85525,0.22, 4617.50],
        "24%": [85526,163300,0.24, 14605.50],
        "32%": [163301,207350,0.32, 33271.50],
        "35%": [207351,518400,0.35, 47367.50],
        "37%": [518401,Infinity,0.37, 156235]
      },
      head_of_household_tax_bracket: {
      },
      married_tax_bracket: {
      },
      married_filing_separately_tax_bracket: {
      },},
    userInput: {}, // data captured in RetirementReferral.vue input form
    incomeData: {}, // data formatted from the input for tax API
    taxUpdate: {}, // tax API's output data to be displayed in Results.vue
    taxSummary: {} // additional objects used for Results.vue & RetirementOptions.vue
  },
  mutations: {
    entry (state, data) {
      state.userInput = data;
    },
    results (state, data) {
      state.taxUpdate = data;
    },
    newTax (state, data) {
      state.taxSummary = data;
    },
  },
  getters: {
    totalDeduction: (state) => {
      let filingStatus = state.userInput.tax_filing_status
      let age = parseInt(state.userInput.age)
      let standardDeduction;
      if ( filingStatus === 'headOfHousehold') {
        return standardDeduction = state["2020TaxTable"].head_of_household_deduction;
      } else if ( filingStatus === 'married') {
        return standardDeduction = state["2020TaxTable"].married_deduction
      } else if ( filingStatus === 'single') {
        return standardDeduction = state["2020TaxTable"].single_deduction
      } else if ( filingStatus === 'marriedFilingSeparately'){
        return standardDeduction = state["2020TaxTable"].married_filing_separately_deduction
      } else { return standardDeduction = 0 };
      //let elderStandardDeduction; **NOT WORKING YET......**
      //if (age >= 65) {
      //  return elderStandardDeduction = 1650 } else if ( age >= 65 && filingStatus === 'married') {
      //  return elderStandardDeduction = 1300 } else { return elderStandardDeduction = 0 };
      return totalDeduction = (parseInt(state.taxUpdate.qbiDeduction) + parseInt(standardDeduction) + parseInt(elderStandardDeduction));
    },
    totalIncome: state => {
        let totalIncome;
        if (state.userInput.salary === undefined || state.userInput.salary === '') {
        return totalIncome = parseInt(state.userInput.income)
      } else {
        return totalIncome = parseInt(state.userInput.income) + parseInt(state.userInput.salary)
       }
    },
    profitAfterExpenses: (state, getters) => {
      let profitAfterExpenses = parseInt(getters.totalIncome) - parseInt(state.userInput.expenses)
      return profitAfterExpenses
    },
    w2Tax: state => {
      let w2Tax;
      let salary = parseInt(state.userInput.salary)
      if ( salary === undefined ) {
        w2Tax = 0;
        return w2Tax
      } else if ( salary > 1 || salary < 40000) {
      return w2Tax
    } else if (salary > 40001 || salary < 80000){
      return w2Tax }
    },
    taxBalance: state => {
      return taxBalance = parseInt(state.taxUpdate.taxBalance) + 1000;
    },
    profitAfterTaxes: (state, getters) => {
      return profitAfterTaxes = parseInt(getters.totalIncome) + parseInt(state.userInput.salary)
      - parseInt(state.userInput.expenses) - parseInt(getters.taxBalance);
    },
  }
};

const calculatorDrag = {
  state: {
    postIraTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      personalContribution: null
    }, // calculations to be displayed in RetirementOptions.vue
    postSepIraTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      businessContribution: null
    }, // calculations to be displayed in RetirementOptions.vue
    postSimpleIraTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      personalContribution: null,
      businessContribution: null
    }, // calculations to be displayed in RetirementOptions.vue
    postIndividual401kTaxData: {
      taxAvoided: null,
      taxAdvantageRatio: null,
      personalContribution: null,
      businessContribution: null
    } // calculations to be displayed in RetirementOptions.vue
  },
  mutations: {},
  getters: {}
};

const store = new Vuex.Store({
  modules: {
    userInformation,
    calculatorDrag
  }
});

export default store;
