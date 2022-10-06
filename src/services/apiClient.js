import axios from "axios";
import AuthContext from '../context/Auth-context';

const ctx = useContext(AuthContext)

// TODO: Implementar .env 
const apiClient = axios.create({baseURL: 'http://localhost:8080/',
headers: { 'authorization': 'Bearer ' + ctx.token ?? '' }})

export default apiClient