import apiClient from "./apiClient";

const AuthService = {
    login: async (body) => {
        const { data } = await apiClient.post('path', body)
        return data
    },
    register: async (body) => {
        const { data } = await apiClient.post('path', body)
        return data
    }
}

export default AuthService