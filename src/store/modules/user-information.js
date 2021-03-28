import * as SMETaxCalculations from "@/taxData/SMETaxCalculations.js";

// Module for containing the data to Results.vue for the initial tax calculations based on user's input
export default {
  namespaced: true,
  state: {
    userInput: {
      tax_filing_status: "headOfHousehold",
      age: 37,
      salary: 32000,
      entity: "llc"
    }, // data captured in RetirementReferral.vue input form
    incomeData: {}, // data formatted from the input for tax API
    taxUpdate: {}, // tax API's output data to be displayed in Results.vue
    taxSummary: {
      totalIncome: 80000,
      profitAfterExpenses: 51111,
      profitAfterTaxes: 41111,
      totalDeduction: 20000,
      w2Tax: 0
    }
  },
  actions: {
    getTotalIncome({ commit }) {
      commit("setTotalIncome");
    },
    getProfitAfterExpenses({ commit }) {
      commit("setProfitAfterExpenses");
    },
    getProfitAfterTaxes({ commit }) {
      commit("setProfitAfterTaxes");
    },
    async getTotalDeduction({ commit }) {
      try {
        const response = await SMETaxCalculations.addTotalDeduction();
        commit("setTotalDeduction", response);
      } catch (err) {
        console.error(err);
      }
    },
    async getW2Tax({ commit }) {
      try {
        const response = await SMETaxCalculations.w2Tax();
        commit("setW2Tax", response);
      } catch (err) {
        console.error(err);
      }
    },
    async getTaxSummary({ dispatch }) {
      dispatch("getTotalDeduction");
      await dispatch("getTotalIncome");
      await dispatch("getProfitAfterExpenses");
      await dispatch("getProfitAfterTaxes");
    }
  },
  mutations: {
    entry(state, data) {
      state.userInput = data;
    },
    addUserInputKey(state, data) {
      state.userInput[data.key] = data.value;
    },
    results(state, data) {
      state.taxUpdate = data;
    },
    setTotalIncome(state) {
      if (
        state.userInput.salary === undefined ||
        state.userInput.salary === ""
      ) {
        state.taxSummary.totalIncome = parseInt(state.userInput.income);
      } else {
        state.taxSummary.totalIncome =
          parseInt(state.userInput.income) + parseInt(state.userInput.salary);
      }
    },
    setProfitAfterExpenses(state) {
      state.taxSummary.profitAfterExpenses =
        parseInt(state.taxSummary.totalIncome) -
        parseInt(state.userInput.expenses);
    },
    setW2Tax(state, data) {
      state.taxSummary.w2Tax = data;
    },
    setProfitAfterTaxes(state) {
      state.taxSummary.profitAfterTaxes =
        Math.round(
          (parseFloat(state.taxSummary.profitAfterExpenses) -
            parseFloat(state.taxUpdate.taxBalance)) *
            100
        ) / 100;
    },
    setTotalDeduction(state, data) {
      state.taxSummary.totalDeduction = data;
    }
  }
};
