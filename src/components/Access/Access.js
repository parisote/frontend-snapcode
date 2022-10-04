import React, {useRef, useContext, useState} from 'react'
import AuthContext from '../../context/Auth-context';
import './styles/Access.css'

const Access = () => {
  const ctx = useContext(AuthContext)
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const handleSubmit = (event) =>{
    event.preventDefault();
    const username = usernameRef.current.value
    const password = passwordRef.current.value
    console.log(username, password)
    if (!username || !password){
      alert("Must enter username and password")
      return
    }
    const body = {username, password}
    ctx.onLogin(body)
  }

  return (
    <body className="container-access">
      <main className="form-signin w-100 m-auto">
        <form>
          <h1 className="h3 mb-3 fw-normal">Sign in</h1>

          <div className="form-floating">
            <input ref={usernameRef} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Username or email</label>
          </div>
          <div className="form-floating">
            <input ref={passwordRef} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
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

export default Access;