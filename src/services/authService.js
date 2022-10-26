import apiClient from "./apiClient";

const AuthService = {
    login: async (body) => {
        try {
            const response = await apiClient.post('api/auth/login', {email: body.email, password: body.password})
            return response
        } catch (error) {
            return {status: error.response.status, message: error.message}
        }
        
    },
    register: async (email, password) => {
        try {
            const response = await apiClient.post('api/auth/register', {email: email, password: password})
            console.log(response)
            return response
        } catch (error) {
            return {status: error.response.status}
        }
        
    }
}

export default AuthService