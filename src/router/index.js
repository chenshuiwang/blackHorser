import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入路由所映射的组件
import Login from '../views/Login.vue'
import Personal from '../views/Personal.vue'
import EditPersonal from '../views/EditPersonal.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Search from '../views/Search.vue'
import Test from '../views/test.vue'
// 创建路由对象
let router = new VueRouter({
    // 配置路由
    routes:[
        {
            name:'Index',
            path:'/',
            component:Index
        },
        {
            name:'Register',
            path:'/register',
            component:Register
        },
        {
            name:'Search',
            path:'/search',
            component:Search
        },
        {
            name:'Login',
            path:'/login',
            component:Login
        },
        {
            name:'Personal',
            path:'/personal/:id',
            component:Personal
        },
        {
            name:'EditPersonal',
            path:'/editPersonal/:id',
            component:EditPersonal
        },
        {
            name:'Test',
            path:'/test',
            component:Test
        }
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.path.indexOf('/personal')===0){
        let token = localStorage.getItem('login_token')
        if(token){
            next()
        }else{
            next({name:'Login'})
        }
    }else{
        next()
    }
})
// 暴露
export default router
