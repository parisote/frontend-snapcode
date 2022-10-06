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

    const [userId, setUserId] = useState(null)
    const [token, setToken] = useState(null)

    const isAuth = () => {
        const auth = JSON.parse(localStorage.getItem("auth"))
        if (!auth) {
            return false
        }
        setUserId(auth.userId)
        setToken(auth.token)
        return true
    }

    const loginHandler = async (body) => {
        const response = await authService.login(body)
        if (response.status !== 200) {
            return { auth: false }
        }
        localStorage.setItem("auth", JSON.stringify({ userId: response.user.id, token: response.token }))
        setUserId(response.user.id)
        setToken(response.token)
        return { auth: true }
    }

    const logoutHandler = () => {
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