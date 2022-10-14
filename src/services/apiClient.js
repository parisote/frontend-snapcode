import axios from "axios";

// TODO: Implementar .env 
const apiClient = axios.create({baseURL: 'http://localhost:5555/'})

export default apiClient