import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const userInformation = {
  state: {
    userInput: {

    }, // data captured in RetirementReferral.vue input form
    incomeData: {}, // data formatted from the input for tax API
    taxUpdate: {
    },
    taxSummary: {

    }, // tax API's output data to be displayed in Results.vue
  },
  mutations: {},
  getters: {},
}

const calculatorDrag = {
  state: {
       postIraTaxData: {
        taxAvoided: null,
        taxAdvantageRatio: null,
        personalContribution: null,
      }, // calculations to be displayed in RetirementOptions.vue
      postSepIraTaxData: {
        taxAvoided: null,
        taxAdvantageRatio: null,
        businessContribution: null,
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
      }, // calculations to be displayed in RetirementOptions.vue
  },
  mutations: {},
  getters: {},
}

const store = new Vuex.Store({
  modules: {
    a: userInformation,
    b: calculatorDrag
  }
});

export default store
