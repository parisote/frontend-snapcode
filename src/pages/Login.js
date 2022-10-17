import React, { useState } from 'react'
import useAuth from  '../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../styles/Access.css'

const Login = (props) => {
  const ctx = useAuth();

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
    <body className="container-access">
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>
          <div className="form-floating">
            <input onChange={handleEmailChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input onChange={handlePasswordChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> <span>Remember me</span>
            </label>
          </div>
          <button onClick={handleSubmit} className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
          <div>
            New?&nbsp;
            <a href="/Register"> 
              Sign up
            </a>
          </div>
        </form>
        {error? <div class="alert alert-danger mt-3" role="alert"> {errorMsj} </div> : <></>}
      </main>
    </body>
  )
}

export default Login;