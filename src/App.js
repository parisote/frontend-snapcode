import React, { useContext, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login"
import Profile from './pages/Profile'
import Trending from './pages/Trending'
import Feed from "./pages/Feed"
import AuthContext from './context/Auth-context';
function App() {
  const ctx = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    let isAuth = ctx.isAuth()
    if (!isAuth) {
      redirectToLogin()
    }
  }, [])

  const redirectToFeed = () =>{
    navigate("/feed")
  }

  const redirectToLogin = () =>{
    navigate("/login")
  }

return (
    <>
      <div>
         <NavigationBar redirectToLogin={redirectToLogin}/>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/feed"/>} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/login" element={<Login redirectToFeed={redirectToFeed}/>} />
      </Routes>
    </>
  )
}

export default App