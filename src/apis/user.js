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
export const register = (data) =>{
    return axios({
        method:'post',
        url:'/register',
        data
    })
}
export const followUser = (id)=>{
    return axios({
        url:`/user_follows/${id}`
    })
}
export const unfollowUser = (id)=>{
    return axios({
        url:`/user_unfollow/${id}`
    })
}