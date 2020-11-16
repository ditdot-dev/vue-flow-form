import Vue from "vue";
import Vuex from "vuex";
import * as TaxApi from "../models/TaxApi.js"

Vue.use(Vuex);

const userInformation = {
  namespaced: true,
  state: {
    userInput: {}, // data captured in RetirementReferral.vue input form
    incomeData: {}, // data formatted from the input for tax API
    taxUpdate: {},
    taxSummary: {} // tax API's output data to be displayed in Results.vue
  },
  mutations: {
    entry (state, data) {
      state.userInput = data;
    },
    results (state, data) {
      state.taxUpdate = data;
    }
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
