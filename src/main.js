import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import 'normalize.css'
import '@/assets/css/base.css'
import store from './store'
import utils from '@/utils/utils'
import '@/utils/filter'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

Vue.prototype.$utils = utils
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
