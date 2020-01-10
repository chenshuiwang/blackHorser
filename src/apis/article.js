import axios from '../utils/myaxios.js'
export const getPostList=(params)=>{
    return axios({
        url:'/post',
        params
    })
}
export const getArticleById = (id)=>{
    return axios({
        url:`/post/${id}`
    })
}
export const likeArticle = (id)=>{
    return axios({
        url:`/post_like/${id}`
    })
}
export const starArticle =(id)=>{
    return axios({
        url:`/post_star/${id}`
    })
}
export const getUserStars =()=>{
    return axios({
        url:`/user_star`
    })
}
export const getCommentList =(id,params)=>{
    return axios({
        url:`/post_comment/${id}`,
        params
    })
}
export const replyComment =(id,data)=>{
    return axios({
        method:'post',
        url:`/post_comment/${id}`,
        data
    })
}
export const searchArticle =(params)=>{
    return axios({
        url:`/post_search`,
        params
    })
}

