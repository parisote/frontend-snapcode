import axios from "axios";

const PORT = process.env.REACT_APP_API_PORT
const baseURL = "http://localhost:" + PORT

let token = ''
if (localStorage.getItem('auth')) {
    token = JSON.parse(localStorage.getItem('auth')).token
    console.log(token)
}

const apiClient = axios.create({
    baseURL: baseURL,
    headers: { 'authorization': 'Bearer ' + token }
})

export const userApi = axios.create({
    baseURL: baseURL + '/api/user',
    headers: { 'authorization': 'Bearer ' + token }
});

export const postApi = axios.create({
    baseURL: baseURL + '/api/post',
    headers: { 'authorization': 'Bearer ' + token },
});

export const profileApi = axios.create({
    baseURL: baseURL + '/api/user/profile/',
    headers: { 'authorization': 'Bearer ' + token },
})

export default apiClient; 