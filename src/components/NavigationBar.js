import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import AuthContext from '../context/Auth-context';
import Modal from 'react-bootstrap/Modal';
import PostEditor from './PostEditor';
import truncarString from '../utils/stringUtils';
import searchbarService from '../services/searchbarService'

function NavigationBar() {
    const ctx = useContext(AuthContext)
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [input, setInput] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        const identifier = setTimeout( async () => {
            handleSerched(input)
            if (input){
                let response = await searchbarService.search(input)
                setUsers(response.data)
                setShowDropdown(true)
            }
        } ,500)

        return () => {
            clearTimeout(identifier)
            setShowDropdown(false)
          }
      }, [input])

    const goToUserProfile = (id) => {
        navigate("/profile", {state: {id}})
        setShowDropdown(false)
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = (event) => {
        ctx.onLogout()
        navigate("/login")
    }

    const handleSerched = (event) => {
        if (event.target) setInput(event.target.value)
      }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/feed">SnapCode</Navbar.Brand>
                <Form>
                    <div className="d-flex flex-column position-relative align-items-center" style={{alignItems: 'baseline'}}>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="me-2 p-1 bg-black border-0 rounded text-light "
                            
                            aria-label="Search"
                            size='sm'
                            onChange={handleSerched}
                        />
                        {showDropdown && input?
                        <div className="list-group position-absolute top-100" >  
                            {users.map((user) => {
                                return (
                                    <a onClick={() => goToUserProfile(user.id)} href='#' key={user.id} className="list-group-item list-group-item-action d-flex bg-dark text-light">   
                                        <img className='rounded-circle me-2' src='https://cdn.wallpapersafari.com/71/8/mFdy4l.jpg' style={{ maxHeight: '40px' }}  />
                                        <span className='align-self-center'>{truncarString(user.username)}</span>
                                    </a>
                                )})
                            }
                            
                        </div> : <></>}
                    </div>              
                </Form>
                
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/feed"> Feed </Nav.Link>
                        <Nav.Link href="/trending" >Trending</Nav.Link>
                    </Nav>
                    <Nav>
                        <div className="d-flex align-items-center text-white text-decoration-none">
                            <Dropdown drop='down' align={{ lg: 'end' }} >
                                <Dropdown.Toggle id="user-menu" variant="black text-white"  onClick={handleShow}>
                                    Nuevo Post
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="d-flex align-items-center text-white text-decoration-none">

                            <Dropdown drop='down' align={{ lg: 'end' }} >
                                <Dropdown.Toggle id="user-menu" variant="black text-white">
                                    <img alt="img1" className='rounded-circle me-2' src='https://cdn.wallpapersafari.com/71/8/mFdy4l.jpg' style={{ maxHeight: '50px' }} ></img>
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item eventKey="2" href="/profile">Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout} eventKey="2">Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Modal size="xl" show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header className="bg-dark text-white" closeButton>
            <Modal.Title className="bg-dark  text-white" >NuevoPost</Modal.Title>
            </Modal.Header>
                <Modal.Body className="bg-dark  text-white">
                <PostEditor/>
                </Modal.Body>
            </Modal>
        </Navbar>
    );
}

export default NavigationBar;