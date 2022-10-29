import axios from "axios";

const PORT = process.env.REACT_APP_API_PORT
const baseURL = process.env.REACT_APP_URI

let token = ''
if (localStorage.getItem('auth')) {
    token = JSON.parse(localStorage.getItem('auth')).token
    console.log(token)
}

const apiClient = axios.create({
    baseURL: baseURL,
})

apiClient.interceptors.request.use((config) => {
    const { url } = config
    if (url === 'api/auth/login' || url === 'api/auth/register') {
        return config
    }
    return { ...config, headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth')).token}` } }
})

apiClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('auth')
    }
    return Promise.reject(error)
})

export const userApi = axios.create({
    baseURL: baseURL + '/api/user',
    headers: { 'Authorization': 'Bearer ' + token }
});

// export const postApi = axios.create({
//     baseURL: baseURL + '/api/post',
//     headers: { 'Authorization': 'Bearer ' + token },
// });

// export const profileApi = axios.create({
//     baseURL: baseURL + '/api/user/profile/',
//     headers: { 'Authorization': 'Bearer ' + token },
// })

export default apiClient; 