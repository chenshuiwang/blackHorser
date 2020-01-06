import axios from '../utils/myaxios.js'
export const login = (data)=>{
    return axios({
        method:'post',
        url:'/login',
        data
    })
}
export const getUserById = (id)=>{
    return axios({
        url:`/user/${id}`,
        //headers:{'Authorization':localStorage.getItem('login_token')}
    })
}