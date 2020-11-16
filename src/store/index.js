import Vue from "vue";
import Vuex from "vuex";
import * as TaxApi from "../models/TaxApi.js"

Vue.use(Vuex);

const userInformation = {
  namespaced: true,
  state: {
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
    totalIncome: state => {
        let totalIncome;
        if (state.userInput.salary === undefined) {
          let totalIncome = parseInt(state.userInput.income)
        return totalIncome
      } else {
        let totalIncome = parseInt(state.userInput.income) + parseInt(state.userInput.salary)
        return totalIncome
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
      } else if ( salary > 1 & salary < 40000) {
      return w2Tax
    } else if (salary > 40001 & salary < 80000){
      return w2Tax
    }
    },
    taxBalance: (state, getters) => {
      let taxBalance = parseInt(getters.w2Tax) + parseInt(state.taxUpdate.taxBalance)
      return taxBalance
    },
    profitAfterTaxes: (state, getters) => {
      let profitAfterTaxes = parseInt(getters.totalIncome)+parseInt(state.userInput.salary)
      - parseInt(state.userInput.expenses) - parseInt(getters.taxBalance);
      return profitAfterTaxes
    }
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
