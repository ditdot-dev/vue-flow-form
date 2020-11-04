/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import VTooltip from "v-tooltip";
import Calculator from './RetirementReferral.vue'

Vue.use(VTooltip)
Vue.use(VueRouter)

new Vue({
  render: h => h(Calculator),
}).$mount('#app')
