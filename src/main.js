import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fetch from './utils'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

Vue.use(Vant)
Vue.prototype.$axios = fetch
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
