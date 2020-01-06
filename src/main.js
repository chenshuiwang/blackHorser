import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/reset.css'
import {Button,Toast,Icon,Uploader,Dialog,Field,Picker} from 'vant'
Vue.use(Button)
   .use(Toast)
   .use(Uploader)
   .use(Dialog)
   .use(Field)
   .use(Icon)
   .use(Picker)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
