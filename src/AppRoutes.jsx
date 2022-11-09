import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom"
import AuthContext from "./context/Auth-context";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import Feed from "./pages/Feed.jsx"
import Post from "./pages/Post.jsx"
import Trending from "./pages/Trending.jsx"
import NavigationBar from "./components/NavigationBar"

const AppRoutes = () => {

    const { isAuth, userId } = React.useContext(AuthContext)

    return (
        <>
            {isAuth() && <NavigationBar userId={userId} />}
            <Routes>
                {!isAuth() ?
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" />} replace />
                    </>
                    : <>
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/post" element={<Post />} />
                        <Route path="/trending" element={<Trending />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/profile" />} replace />
                    </>
                }
            </Routes>
        </>
    );
}
export default AppRoutes;
