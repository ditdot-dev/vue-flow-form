import Vue from 'vue'
import App from './App.vue'
import VueScrollTo from 'vue-scrollto'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.config.productionTip = false
Vue.use(VueScrollTo)
Vue.use(VueTextareaAutosize)

Vue.filter('replace', function (value, search, replace) {
  return value.replace(search, replace)
})

new Vue({
  render: h => h(App),
}).$mount('#app')
