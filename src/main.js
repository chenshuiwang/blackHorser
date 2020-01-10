import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './styles/reset.css'
import {Button,Toast,Icon,Uploader,Dialog,Field,Picker,Tab,Tabs,List,PullRefresh,SwipeCell,Search} from 'vant'
Vue.use(Button)
   .use(Toast)
   .use(Uploader)
   .use(Dialog)
   .use(Field)
   .use(Icon)
   .use(Picker)
   .use(Tab)
   .use(Tabs)
   .use(List)
   .use(PullRefresh)
   .use(SwipeCell)
   .use(Search)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
