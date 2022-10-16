import React, { useState } from 'react'
import AuthService from '../services/authService'
import '../styles/Access.css'

const Register = (props) => {

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
    console.log(email, password)
    const response = await AuthService.register(email, password);
    if (response.status === 201) {
      props.redirectToLogin()
    } else {
      console.log("error")
    }
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
          <h1 className="h3 mb-3 fw-normal">Sign up</h1>
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
          <button onClick={handleSubmit} className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
        </form>
        {error? <div class="alert alert-danger mt-3" role="alert"> {errorMsj} </div> : <></>}
      </main>
    </body>
  )
}

export default Register;