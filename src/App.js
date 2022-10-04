import React, { useContext, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Access from "./components/Access/Access"
import Profile from './components/Profile'
import Trending from './components/Trending'
import Feed from "./components/Feed"
import AuthContext from './context/Auth-context';
function App() {
  const ctx = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"))
    if (auth) {
      ctx.userId = auth.userId
      ctx.token = auth.token
    } else {
      navigate("/access")
    }
  }, [])

  return (
    <>
      <div>
         <NavigationBar />
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/access" element={<Access />} />
      </Routes>
    </>
  )
}

export default App