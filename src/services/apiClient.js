import axios from "axios";
require('dotenv').config()

const PORT = process.env.REACT_APP_API_PORT
const baseURL= "http://localhost:" + PORT
// TODO: Implementar .env 


const apiClient = axios.create({baseURL: baseURL})

export const userApi = axios.create({
    baseURL: baseURL+'/api/user',
});


export const postApi = axios.create({
    baseURL: baseURL+'/api/post',
});

export default apiClient ; 