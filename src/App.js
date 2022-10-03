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

  const redirect = (path) => {
        navigate(path);
  }

  const [isAuth, setIsAuth] = useState(true)

  const checkAuth = () => {   
    setIsAuth(true)
    if (!isAuth) {
      redirect("/access")
    } 
    if (window.location.pathname == "/access" && isAuth){
      redirect("/feed")
    }
    
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <div>
      <div>
        {isAuth ? <NavigationBar /> : <></>}
      </div>
      <Routes>
        <Route path="/feed" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/access" element={<Access />} />
        
      </Routes>
    </div>
  )
}

export default App