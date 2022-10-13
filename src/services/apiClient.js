import axios from "axios";
require('dotenv').config()

// TODO: Implementar .env 

const PORT = process.env.REACT_APP_API_PORT
const apiClient = axios.create({baseURL: `http://localhost:${PORT}/`})

export default apiClient