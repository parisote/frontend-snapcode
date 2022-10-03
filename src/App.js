import React from 'react'
import NavigationBar from './components/NavigationBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Register from "./components/Register"
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <div>
        <NavigationBar />
      </div>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route exact path="/Register" element={<Register/>}/>        
      </Routes>
    </Router>
  )
}

export default App