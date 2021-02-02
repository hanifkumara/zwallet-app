import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'

Vue.filter('numFormat', numFormat(numeral))

// Install BootstrapVue
Vue.use(BootstrapVue)

Vue.use(require('vue-moment'))

Vue.config.productionTip = false
Vue.directive('setstyle', {
  bind: function (el, binding) {
    if (binding.value === 'chill' || binding.arg === 'size') {
      el.style.color = 'grey'
      el.style.fontSize = '12px'
    } else if (binding.value === 'dark') {
      el.style.color = 'red'
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
