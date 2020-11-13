/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

import Vue from 'vue'
import Example from './Example.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
      count: 1
  },
  mutations: {

  }
})

var app = new Vue({
  render: h => h(Example),
  store
}).$mount('#app')
