import React, { useState, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Access from "./components/Access/Access"
import Profile from './components/Profile'
import Trending from './components/Trending'
import Home from "./components/Feed"

function App() {

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false)

  const checkAuth = () => {
    if (!isAuth) {
      navigate("/access")
    }
    if (window.location.pathname == "/access" && isAuth) {
      navigate("/feed")
    }

  }

  const handleLogin = () => {
    setIsAuth(true)
    navigate("/feed")
  }

  const handleLogout = () =>{
    setIsAuth(false)
    navigate("/access")
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <>
        <div>
          {isAuth ? <NavigationBar handleLogout={handleLogout} /> : <></>}
        </div>
        <Routes>
          <Route path="/feed" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/access" element={<Access handleLogin={handleLogin}/>} />

        </Routes>
    </>
  )
}

export default App