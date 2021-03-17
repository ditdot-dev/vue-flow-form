import * as TaxApi from "@/api/TaxApi.js";

// Module for containing the data to RetirementOptions.vue for the calculations to define Tax Avoided
export default {
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
    setTaxAvoided(state, data) {
      state.postIraTaxData.taxAvoided = data;
    }
  },
  actions: {
    async getTaxAvoided({ commit }) {
      try {
        const response = await TaxApi.repostData();
        commit("setTaxAvoided", response);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
