import Vue from "vue";
import Vuex from "vuex";
import * as TaxApi from "../api/TaxApi.js"
import * as SMETaxCalculations from "../taxData/SMETaxCalculations.js"
import * as TaxTable from "../taxData/TaxTable.js"

Vue.use(Vuex);

// Module for containing the data to Results.vue for the initial tax calculations based on user's input
const userInformation = {
  namespaced: true,
  state: {
    "2020TaxTable": {
      single_deduction: 12400,
      married_deduction: 24800,
      married_filing_separately_deduction: 12400,
      head_of_household_deduction: 18650,
      },
    userInput: {
      tax_filing_status: 'single',
      age: 20,
        }, // data captured in RetirementReferral.vue input form
    test: 20,
    incomeData: {}, // data formatted from the input for tax API
    taxUpdate: {}, // tax API's output data to be displayed in Results.vue
    taxSummary: {
      totalIncome: 0,
      profitAfterExpenses: 0,
      taxBalance: 0,
      profitAfterTaxes: 0,
      totalDeduction: 0,
      w2Tax: 0,
    },
  },
  actions: {
    getTotalIncome ({commit}){
      commit('setTotalIncome')
    },
    getProfitAfterExpenses ({commit}) {
      commit('setProfitAfterExpenses');
    },
    getProfitAfterTaxes ({commit}) {
      commit('setProfitAfterTaxes');
    },
    async getTotalDeduction ({ commit }) {
      try {
        const response = await SMETaxCalculations.totalDeduction();
        commit ('setTotalDeduction', response);
    } catch (err) {
        console.error(err);
    }},
    async getTaxSummary ({dispatch}){
      dispatch ('getTotalDeduction')
      dispatch ('getTotalIncome')
      await dispatch ('getProfitAfterExpenses')
      await dispatch ('getProfitAfterTaxes')
    }
   },
  mutations: {
    entry (state, data) {
      state.userInput = data;
    },
    results (state, data) {
      state.taxUpdate = data;
    },
    setTotalIncome (state) {
        if (state.userInput.salary === undefined || state.userInput.salary === '') {
        state.taxSummary.totalIncome = parseInt(state.userInput.income)
      } else {
        state.taxSummary.totalIncome = parseInt(state.userInput.income) + parseInt(state.userInput.salary)
       }
    },
    setProfitAfterExpenses (state) {
    state.taxSummary.profitAfterExpenses = parseInt(state.taxSummary.totalIncome) - parseInt(state.userInput.expenses);
    },
    setProfitAfterTaxes (state) {
    state.taxSummary.profitAfterTaxes = parseFloat(state.taxSummary.profitAfterExpenses) - parseFloat(state.taxUpdate.taxBalance)
    },
    setTotalDeduction (state, data) {
      state.taxSummary.totalDeduction = data;
    }
  },
};
// Module for containing the data to RetirementOptions.vue for the calculations to define Tax Avoided
const calculatorDrag = {
  namespaced: true,
  state: {
    taxData0: {}, // additional objects from Results.vue to be used in RetirementOptions.vue
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
  mutations: {
    baseTax (state, data) {
      state.taxData0 = data;
    },
  },
  actions: {
    async getTaxSummary ({ commit }) {
      try {
        const response = await TaxApi.postTaxData();
        commit ('baseTax', response);
    } catch (err) {
        console.error(err);
    }
    },
  }
};

const store = new Vuex.Store({
  modules: {
    userInformation,
    calculatorDrag
  }
});

export default store;
