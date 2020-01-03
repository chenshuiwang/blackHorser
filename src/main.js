import Vue from 'vue'
import App from './views/Login.vue'
import router from './router/index.js'
import './styles/reset.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
