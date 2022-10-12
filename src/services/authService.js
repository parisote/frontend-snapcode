import apiClient from "./apiClient";

const AuthService = {
    login: async (body) => {
        try {
            const response = await apiClient.post('api/auth/login', {email: body.email, password: body.password})
            console.log(response)
            return response
        } catch (error) {
            return {status: error.response.status}
        }
        
    },
    register: async (body) => {
        try {
            const response = await apiClient.post('api/auth/register', body)
            return response
        } catch (error) {
            return error
        }
        
    }
}

export default AuthService