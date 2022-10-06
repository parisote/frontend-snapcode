import React, { useContext, useState } from 'react'
import AuthContext from '../context/Auth-context';
import '../styles/Access.css'

const Login = (props) => {
  const ctx = useContext(AuthContext)

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      alert("Must enter username and password")
      return
    }
    const body = { username, password }
    let response = await ctx.onLogin(body)
    if (response.auth) {
      props.redirectToFeed()
    } else {
      alert("Incorrect email or password")
    }
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value)
  }

  return (
    <body className="container-access">
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>
          <div className="form-floating">
            <input onChange={handleUsernameChange} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Username or email</label>
          </div>
          <div className="form-floating">
            <input onChange={handlePasswordChange} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button onClick={handleSubmit} className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </main>
    </body>
  )
}

export default Login;