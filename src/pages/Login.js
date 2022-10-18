import React, { useContext, useState } from 'react'
import AuthContext from '../context/Auth-context';
import '../styles/Access.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Login = (props) => {
  const ctx = useContext(AuthContext)
  
  const navigate = useNavigate();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)
  const [errorMsj, setErrorMsj] = useState()


   const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      handleError("Must enter email and password")
      return
    }
    const isAuth = await ctx.onLogin({email, password})
    if (!isAuth) {
      handleError("Incorrect email or password")
      return
    }
    navigate(from, { replace: true});
    // props.redirectToFeed();
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim())
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleError = (error) => {
    setErrorMsj(error)
    setError(true)
  }

  return (
    <section className="vh-100" style={{backgroundColor: '#53504F'}}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{borderRadius: '1rem'}}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img src="./login.png"
                  className="img-fluid" style={{borderRadius: '1rem 0 0 1rem' }}/>
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form>
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{color: '#ff6219'}}></i>
                      <span className="h1 fw-bold mb-0">Sign in</span>
                    </div>

                    <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                    <div className="form-outline mb-4">
                      <input type="email" onChange={handleEmailChange} className="form-control form-control-lg" />
                      <label className="form-label" >Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input type="password" onChange={handlePasswordChange} className="form-control form-control-lg" />
                      <label className="form-label" >Password</label>
                    </div>

                    {error? <div class="alert alert-danger" role="alert"> {errorMsj} </div> 
                    : <></>}

                    <div className="pt-1 mb-4">
                      <button className="btn btn-dark btn-lg btn-block" onClick={handleSubmit} type="button">Login</button>
                    </div>

                    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? 
                      <a className='m-2' href="/register" style={{color: '#393f81'}}>Register here</a>
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

export default Login;