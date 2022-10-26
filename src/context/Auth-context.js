import React, { useState } from 'react'
import authService from '../services/authService'

const AuthContext = React.createContext({
    userId: null,
    token: null,
    isAuth: () => { },
    onLogin: (body) => { },
    onLogout: () => { }
})

export const AuthContextProvider = (props) => {

    const [userId, setUserId] = useState(() => {
        const auth = localStorage.getItem('auth')

        if (!auth) return null

        return JSON.parse(localStorage.getItem('auth')).userId
    })

    const [token, setToken] = useState(() => {
        const auth = localStorage.getItem('auth')

        if (!auth) return null

        return JSON.parse(localStorage.getItem('auth')).token
    })

    const isAuth = () => !!token

    const loginHandler = async (body) => {
        const response = await authService.login(body)
        if (response.status !== 200) {
            return false
        }
        localStorage.setItem("auth", JSON.stringify({ userId: response.data.user.id, token: response.data.token }))
        setUserId(response.data.user.id)
        setToken(response.data.token)
        return true
    }

    const logoutHandler = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem("auth")
    }

    return (
        <AuthContext.Provider
            value={{
                userId: userId,
                token: token,
                isAuth: isAuth,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext