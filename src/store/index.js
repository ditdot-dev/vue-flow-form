import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import userInformation from "./modules/user-information";
import calculatorDrag from "./modules/calculator-drag";
import { logging } from "@/utils/logging";

Vue.use(Vuex);

// Persistent Vuex
const persistentState = new createPersistedState({
  paths: ["userInformation", "calculatorDrag"]
});

const store = new Vuex.Store({
  modules: {
    userInformation,
    calculatorDrag
  },
  plugins: [persistentState]
});

export default store;
