/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/
import Vue from 'vue'
import '@babel/polyfill'
import 'mutationobserver-shim'
import '../../src/plugins/bootstrap-vue'
import Calculator from './RetirementReferral.vue'
import VueRouter from 'vue-router'
import VTooltip from "v-tooltip";


Vue.use(VTooltip, {
  defaultTrigger: window.innerWidth > 768 ? 'hover focus click' : 'click'
  })

Vue.use(VueRouter)


var assist = new Vue({
  render: h => h(Calculator),
//  data: {
  //  helptext: '123'}
}).$mount('#app')
