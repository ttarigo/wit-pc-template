import Vue from 'vue'
import App from './App.vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
// import '@/styles/theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import store from './store/index.js'
import router from './router/index.js'

import '@/icons'
import '@/permission'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
