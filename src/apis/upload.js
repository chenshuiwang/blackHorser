import axios from '../utils/myaxios.js'
export const uploadFile = (data) => {
    return axios({
        method:'post',
        url:'/upload',
        data
    })
}
export const updateUserById = (id,data)=>{
    return axios({
        method:'post',
        url:`/user_update/${id}`,
        data
    })
}