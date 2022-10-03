import React from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">SnapCode</Navbar.Brand>
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
                        <Nav.Link href="/"> Home </Nav.Link>
                        <Nav.Link href="#action2" >Trending</Nav.Link>
                    </Nav>
                    <Nav>
                        <div className="d-flex align-items-center text-white text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                            <Nav.Link href="../Register"> Register </Nav.Link>
                            <Dropdown drop='down' align={{ lg: 'end' }} >
                                <Dropdown.Toggle id="user-menu" variant="black text-white">
                                    <img alt= "img1" className='rounded-circle me-2' src='https://i1.sndcdn.com/avatars-000138404358-sdp2xr-t500x500.jpg' style={{ maxHeight: '50px' }} ></img>
                                </Dropdown.Toggle>


                                <Dropdown.Menu variant="dark">
                                    <Dropdown.Item eventKey="2">Profile</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="2">Log out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;