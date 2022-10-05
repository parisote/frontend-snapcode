import React, { useContext, useEffect } from 'react'
import NavigationBar from './components/NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Access from "./pages/Access"
import Profile from './pages/Profile'
import Trending from './pages/Trending'
import Feed from "./pages/Feed"
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
      redirectToAccess()
    }
  }, [])

  const redirectToFeed = () =>{
    navigate("/feed")
  }

  const redirectToAccess = () =>{
    navigate("/access")
  }

return (
    <>
      <div>
         <NavigationBar redirectToAccess={redirectToAccess}/>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/feed"/>} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/access" element={<Access redirectToFeed={redirectToFeed}/>} />
      </Routes>
    </>
  )
}

export default App