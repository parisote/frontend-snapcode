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
import PostMedia from './PostMedia';
import apiClient from '../services/apiClient';
import { profileApi } from '../services/apiClient'
import truncarString from '../utils/stringUtils';

function NavigationBar(id) {

    const ctx = useContext(AuthContext)
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [showPost, setShowPost] = useState(false);
    const [showMedia, setShowMedia] = useState(false);

    const handleClosePost = () => setShowPost(false);
    const handleShowPost = () => setShowPost(true);
    const handleCloseMedia = () => setShowMedia(false);
    const handleShowMedia = () => setShowMedia(true);

    const [input, setInput] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [users, setUsers] = useState([])

    const goToUserProfile = (id) => {
        navigate("/profile", { state: { id } })
        window.location.reload()
        setShowDropdown(false)
    }

    const handleSerched = (event) => {
        if (event.target) setInput(event.target.value)
    }

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
        window.location.reload()
    }

    useEffect(() => {
        apiClient.get(`/api/user/${ctx.userId}`).then(parseUser)
        apiClient.get(`/api/user/profile/${ctx.userId}`).then(parseProfile)
    }, []);
    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)

    useEffect(() => {
        const identifier = setTimeout(() => {
            handleSerched(input)
            if (input) {
                profileApi.get(`search/${input}`).then((res) => setUsers(res.data))
                setShowDropdown(true)
            }
        }, 500)

        return () => {
            clearTimeout(identifier)
            setShowDropdown(false)
        }
    }, [input])

    if (!profile || !user) {
        return <div className='bg-dark min-vh-100'>loading</div>
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/feed">SnapCode</Navbar.Brand>
                <Form>
                    <div className="d-flex flex-column position-relative align-items-center" style={{ alignItems: 'baseline' }}>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="me-2 p-1 bg-black border-0 rounded text-light "

                            aria-label="Search"
                            size='sm'
                            onChange={handleSerched}
                        />
                        {showDropdown && input ?
                            <div className="list-group position-absolute top-100 start-0" >
                                {users.map((user) => {
                                    return (
                                        <a onClick={() => goToUserProfile(user.userId)} href='#' key={user.userId} className="list-group-item list-group-item-action d-flex bg-dark text-light">
                                            <img className='rounded-circle me-2' src={user.image} style={{ maxHeight: '40px' }} />
                                            <span className='align-self-center'>{truncarString(user.username)}</span>
                                        </a>
                                    )
                                })
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
                        <Nav.Link onClick={navigateHome}> Feed </Nav.Link>
                        <Nav.Link onClick={navigateTrending}> Trending </Nav.Link>
                    </Nav>
                    <Nav>
                        <div className="d-flex align-items-center text-white text-decoration-none">
                            <Dropdown drop='down' align={{ lg: 'end' }} >
                                <Dropdown.Toggle id="user-menu" variant="black text-white">
                                    New
                                </Dropdown.Toggle>
                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item onClick={handleShowPost}>Code post</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleShowMedia}>Media post</Dropdown.Item>
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
            <Modal size="xl" show={showPost} onHide={handleClosePost} backdrop="static" keyboard={false}>
                <Modal.Header className="bg-dark text-white" closeButton>
                    <Modal.Title className="bg-dark  text-white" >Code post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark  text-white">
                    <PostEditor />
                </Modal.Body>
            </Modal>
            <Modal size="xl" show={showMedia} onHide={handleCloseMedia} backdrop="static" keyboard={false}>
                <Modal.Header className="bg-dark text-white" closeButton>
                    <Modal.Title className="bg-dark  text-white" >Media post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-dark  text-white">
                    <PostMedia />
                </Modal.Body>
            </Modal>
        </Navbar>
    );
}

export default NavigationBar;