import axios from 'axios'

const API = axios.create({
    baseURL: "http://localhost:5000/api/",
    withCredentials: true
});

export const getPosts = async () => await API.get("post/")
export const createPost = async (data) => await API.post("post/", data)
export const generateImage = async (data) => await API.post("generateImage/", data)
export const getUserInfo = async () => await API.get("user/isAuth")
export const loginOrRegister = async (state, data) => await API.post(`user/${state}`, data)
export const getUserById = async (id) => await API.get(`user/getUser?id=${id}`)
export const getPostByUserId = async(userId) => await API.get(`post/getPostByUser/${userId}`) 
export const updateProfile = async (data) => await API.put('user/updateProfile', data)
export const logoutUser = async () => await API.get('user/logout')
export const toggleLikePost = async (postId) => await API.post(`post/like/${postId}`)
export const getPostById = async (postId) => await API.get(`post/getPost/${postId}`)