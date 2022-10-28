import React, { useState } from 'react'
import AuthService from '../services/authService'
import { profileApi } from '../services/apiClient';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';

const Register = (props) => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState(null)
  const [id, setId] = useState(null)
  const [password, setPassword] = useState(null)
  const [username, setUsername] = useState(null)
  const [name, setName] = useState(null)
  const [location, setLocation] = useState(null)
  const [twitter, setTwitter] = useState(null)
  const [workingAt, setWorkingAt] = useState(null)
  const [biography, setBiography] = useState(null)
  const [linkedin, setLinkedin] = useState(null)
  const [error, setError] = useState(false)
  const [errorMsj, setErrorMsj] = useState()
  const [msg, setMsg] = useState(false)
  const [successMsg, setSuccessMsg] = useState()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email || !password) {
      handleError("Must enter email and password")
      return
    }
    const response = await AuthService.register(email, password);
    if (response.status === 201) {
      const id = response.data.id.toString();
      handleId(id)
      handleShow();
    } else {
      console.log("error")
    }
  }

  const handleUser = async (event) => {
    event.preventDefault()
    if (!username || !name) {
      handleError("Must enter your name and username")
      return
    }

    const newUser = {
      name: name,
      username: username,
      biography: biography,
      workingAt: workingAt,
      location: location,
      linkedIn: linkedin,
      twitter: twitter
    };

    let response = await profileApi.post("/update/" + id, newUser);

    if (response.status === 201) {
      handleMsg("Usuario creado. ¡Bienvenido!")
      handleClose();
      setTimeout(() => {
      navigate('/login')
      }, 3000);  
    } else {
      console.log("error")
    }

  }

  const handleId = (event) => {
    setId(event)
  }
  const handleNameChange = (event) => {
    setName(event.target.value.trim())
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value.trim())
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value.trim())
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleBiography = (event) => {
    setBiography(event.target.value)
  }

  const handleWorkingAt = (event) => {
    setWorkingAt(event.target.value)
  }

  const handleLocation = (event) => {
    setLocation(event.target.value)
  }

  const handleLinkedin = (event) => {
    setLinkedin(event.target.value)
  }

  const handleTwitter = (event) => {
    setTwitter(event.target.value)
  }

  const handleMsg = (msg) => {
    setSuccessMsg(msg)
    setMsg(true)
  }

  const handleError = (error) => {
    setErrorMsj(error)
    setError(true)
  }
  return (
    <section className="vh-100 " style={{ backgroundColor: '#53504F' }}>
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

                      {error ? <div class="alert alert-danger" role="alert"> {errorMsj} </div>
                        : <></>}
                      {msg ? <div class="alert alert-success" role="alert"> {successMsg} </div>
                        : <></>}

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header className="bg-dark text-white" closeButton>
                          <Modal.Title className="bg-dark text-white">Datos personales</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="bg-dark text-white">
                          <p>
                            Para terminar, le pediremos que ingrese unos últimos datos para finalizar el registro.
                          </p>
                          <Form>
                            <Form.Group className="mb-3" controlId="username">
                              <Form.Label>Nombre de usuario</Form.Label>
                              <Form.Control
                                className="mb-3 bg-dark text-white"
                                onChange={handleUsernameChange}                                
                                type="name"
                                placeholder="J-Doe"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="name"
                            >
                              <Form.Label>Nombre y apellido</Form.Label>
                              <Form.Control
                                className="mb-3 bg-dark text-white"
                                onChange={handleNameChange}
                                type="name"
                                placeholder="Jane doe"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="biography">
                              <Form.Label>Biografía (Opcional)</Form.Label>
                              <Form.Control
                                className="mb-3 bg-dark text-white"
                                onChange={handleBiography}
                                type="biography"
                                placeholder="About me"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="workingAt">
                              <Form.Label>Lugar de trabajo (Opcional)</Form.Label>
                              <Form.Control
                                className="mb-3 bg-dark text-white"
                                onChange={handleWorkingAt}
                                type="workingAt"
                                placeholder="Google"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group className="mb-3 bg-dark text-white" controlId="place">
                              <Form.Label>Localidad, País (Opcional)</Form.Label>
                              <Form.Control
                                className="mb-3 bg-dark text-white"
                                onChange={handleLocation}
                                type="place"
                                placeholder="Buenos Aires, Argentina"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Linkedin">
                              <Form.Label>Linkedin (Opcional)</Form.Label>
                              <Form.Control
                                className="mb-3 bg-dark text-white"
                                onChange={handleLinkedin}
                                type="Linkedin"
                                placeholder="LinkedinUrl"
                                autoFocus
                              />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Twitter">
                              <Form.Label>Twitter (Opcional)</Form.Label>
                              <Form.Control
                                className="mb-3 bg-dark text-white"
                                onChange={handleTwitter}
                                type="Twitter"
                                placeholder="TwitterUrl"
                                autoFocus
                              />
                            </Form.Group>
                          </Form>
                        </Modal.Body>
                        <Modal.Footer className="bg-dark text-white">
                          <Button variant="primary" onClick={handleUser}>
                            Confirmar
                          </Button>
                          {error ? <div class="alert alert-danger" role="alert"> {errorMsj} </div>
                            : <></>}
                        </Modal.Footer >
                      </Modal>

                      <div className="pt-1 mb-4">
                        <button className="btn btn-primary" onClick={handleSubmit} type="button">Sign up</button>
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