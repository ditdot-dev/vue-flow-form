import { createStore } from "vuex";

export default createStore({
  state () {
    return {
      incomeData: []
    }
  },
  mutations: {
    increment (state){
      state.incomeData++
  }
}});
