import axios from "axios";

const baseURL= "http://localhost:5555/api/"
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