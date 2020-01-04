import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/reset.css'
import {Button,Toast} from 'vant'
Vue.use(Button)
   .use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
