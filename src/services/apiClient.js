import axios from "axios";
require('dotenv').config()

const PORT = process.env.REACT_APP_API_PORT
const baseURL= "http://localhost:" + PORT + "/api/"
// TODO: Implementar .env 


const apiClient = axios.create({baseURL: baseURL})

export const userApi = axios.create({
    baseURL: baseURL+'/api/user',
});


export const postApi = axios.create({
    baseURL: baseURL+'/api/post',
});
//userApi.post("/create",{username: user, password: 123})
export default apiClient ; 