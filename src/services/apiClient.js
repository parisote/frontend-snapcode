import axios from "axios";

// TODO: Implementar .env 
const apiClient = axios.create({baseURL: 'http://localhost:8080/'})

export default apiClient