import apiClient from "./apiClient";

const AuthService = {
    login: async (body) => {
        const { response } = await apiClient.post('api/auth/login', body)
        return response
    },
    register: async (body) => {
        const { response } = await apiClient.post('path', body)
        return response
    }
}

export default AuthService