import axios from "axios";

const baseURL= `https://${process.env.REACT_APP_URI}`

const apiClient = axios.create({baseURL: baseURL})

export const userApi = axios.create({
    baseURL: baseURL+'/api/user',
});

export const postApi = axios.create({
    baseURL: baseURL+'/api/post',
});

export const profileApi = axios.create({
    baseURL: baseURL+'/api/user/profile/',
})

export default apiClient ; 