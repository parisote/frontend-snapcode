import { Navigate, Outlet} from "react-router-dom"
import React from 'react';
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
    const auth = useAuth();
 
    if (auth.userId === null) {
        return <Navigate to='/login' />
    }

    return <Outlet/>
}


export default RequireAuth;