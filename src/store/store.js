import Vue from 'vue'
import Vuex from "vuex";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      userInput: {}, // data captured in RetirementReferral.vue input form
      incomeData: {}, // data formatted from the input for tax API
      taxUpdate: {
      }, // tax API's output data to be displayed in Results.vue
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
});

export default store
