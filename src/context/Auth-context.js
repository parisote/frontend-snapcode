import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext({
    userId: null,
    token: null,
    onLogin: (body) => { },
    onLogout: () => { }
})

export const AuthContextProvider = (props) => {

    const [userId, setUserId] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem("auth"))
        if (auth) {
            setUserId(auth.userId)
            setToken(auth.token)
        }
    }, [])

    const loginHandler = (body) => {
        //llama servicio login, devuelve token e id
        let userId = 1
        let token = "lajvoqwqaryall21sad12dasdkd12l"
        setUserId(userId)
        setToken(token)
        localStorage.setItem("auth", JSON.stringify({ userId, token }))
    }

    const logoutHandler = () => {
        localStorage.removeItem("auth")
    }

    return (
        <AuthContext.Provider
            value={{
                userId: userId,
                token: token,
                onLogin: loginHandler,
                onLogout: logoutHandler
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext