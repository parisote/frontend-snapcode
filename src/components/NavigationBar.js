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
import apiClient from '../services/apiClient';


function NavigationBar(id) {

    const ctx = useContext(AuthContext)
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = (event) => {
        ctx.onLogout()
        navigate("/login")
    }

    const navigateHome = (event) => {
        navigate("/home")
    }

    const navigateTrending = (event) => {
        navigate("/trending")
    }

    const navigateProfile = (event) => {
        navigate("/profile", { state: { id: ctx.userId } })
    }

    useEffect(() => {
        apiClient.get(`/api/user/${ctx.userId}`).then(parseUser)
        apiClient.get(`/api/user/profile/${ctx.userId}`).then(parseProfile)
    }, []);
    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)

    if (!profile || !user) {
        return <div className='bg-dark min-vh-100'>loading</div>
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/feed">SnapCode</Navbar.Brand>
                <Form className="d-flex">
                    <Form.Control
                        type="search"
                        placeholder="Search..."
                        className="me-2 bg-black border-0"
                        aria-label="Search"
                        size='sm'
                    />
                </Form>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={navigateHome}> Feed </Nav.Link>
                        <Nav.Link onClick={navigateTrending}> Trending </Nav.Link>
                    </Nav>
                    <Nav>
                        <div className="d-flex align-items-center text-white text-decoration-none">
                            <Dropdown drop='down' align={{ lg: 'end' }} >
                                <Dropdown.Toggle id="user-menu" variant="black text-white" onClick={handleShow}>
                                    Nuevo Post
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="d-flex align-items-center text-white text-decoration-none">

                            <Dropdown drop='down' align={{ lg: 'end' }} >
                                <Dropdown.Toggle id="user-menu" variant="black text-white">
                                    <img alt="img1" className='rounded-circle me-2' src={`https://vsa-bucket-test.s3.sa-east-1.amazonaws.com/${profile.pfp}`} style={{ maxHeight: '50px' }} ></img>
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item onClick={navigateProfile}>Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
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
                    <PostEditor />
                </Modal.Body>
            </Modal>
        </Navbar>
    );
}

export default NavigationBar;