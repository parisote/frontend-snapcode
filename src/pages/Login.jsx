import React, { useContext, useState } from 'react'
import AuthContext from '../context/Auth-context';
import '../styles/Access.css'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const ctx = useContext(AuthContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      handleError("Must enter email and password")
      return
    }
    const isAuth = await ctx.onLogin({ email, password })
    if (!isAuth) {
      handleError("Incorrect email or password")
      return
    }
    navigate('/profile')
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim())
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleError = (error) => {
    toast.error(error)
    setError(true)
  }

  return (
    <section className="overflow-auto vh-100 vw-100" style={{ backgroundColor: '#53504F' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="./login.png"
                    className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem' }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center bg-dark text-white">
                  <div className="card-body p-4 p-lg-5 bg-dark text-white">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                        <span className="h1 fw-bold mb-0 bg-dark text-white">Sign in</span>
                      </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                      <div className="form-outline mb-4">
                        <input type="email" onChange={handleEmailChange} className="form-control form-control-lg bg-dark text-white" />
                        <label className="form-label" >Email address</label>
                      </div>

                      <div className="form-outline mb-4">
                        <input type="password" onChange={handlePasswordChange} className="form-control form-control-lg bg-dark text-white" />
                        <label className="form-label" >Password</label>
                      </div>

                      {error ? <ToastContainer position="bottom-center" autoClose={3000}/> : <></>}

                      <div className="pt-1 mb-4">
                        <button className="btn btn-primary" type="submit">Login</button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Don't have an account?
                        <a className='m-2' href="/register" style={{ color: '$blue-200' }}>Register here</a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Login;