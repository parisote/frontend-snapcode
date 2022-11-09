import React, { useState } from 'react'
import AuthService from '../services/authService'
import apiClient from '../services/apiClient';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [error, setError] = useState(false)
  const [msg, setMsg] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password || !confirmPassword) {
      handleError("Must enter email and confirm password")
      return
    }

    if (password != confirmPassword) {
      handleError("Passwords must match")
      return
    }

    const response = await AuthService.register(email, password);
    if (response.status === 201) {
      const id = response.data.id.toString();
      handleMsg("User created successfully. Welcome aboard!")
      setTimeout(() => {
        navigate('/login')
      }, 3000);
    } else {
      handleError("An error has occurred, please try again later")
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim())
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  const handleMsg = (msg) => {
    toast.success(msg)
    setMsg(true)
  }

  const handleError = (error) => {
    toast.error(error)
    setError(true)
  }
  
  return (
    <section className="overflow-auto vh-100 vw-100" style={{ backgroundColor: '#53504F' }}>
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="./login.png" alt="login"
                    className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                </div>
                <div className="bg-dark text-white col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0 bg-dark text-white">Sign up</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3 bg-dark text-white" style={{ letterSpacing: '1px' }}>Create your account now</h5>

                      <div className="form-outline mb-4">
                        <input type="email" onChange={handleEmailChange} className="form-control form-control-lg bg-dark text-white" />
                        <label className="form-label bg-dark text-white" >Email address</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" onChange={handlePasswordChange} className="form-control form-control-lg bg-dark text-white" />
                        <label className="form-label bg-dark text-white" >Password</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" onChange={handleConfirmPasswordChange} className="form-control form-control-lg bg-dark text-white" />
                        <label className="form-label bg-dark text-white" >Confirm password</label>
                      </div>

                      {error || msg? <ToastContainer position="bottom-center" autoClose={3000}/> : <></>}

                      <div className="pt-1 mb-4">
                        <button className="btn btn-primary" onClick={handleSubmit} type="submit">Sign up</button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Already registered?
                        <a className='m-2' href="/login" style={{ color: '$blue-200' }}>Login here</a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register;