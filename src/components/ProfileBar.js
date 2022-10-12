import React, { useContext } from 'react'
import AuthContext from '../context/Auth-context';

import Form from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'


function ProfileBar(props) {
  const ctx = useContext(AuthContext)
  
  const followUser = (event) =>{
      alert("followUser")
      return
  }

//Ocultar boton POST cuando es modo vista
//Editor no habilitado cuando es modo vista

  return (
    <div className="square border rounded-end rounded-start col-md-6 m-1 mx-auto" >
      <img className='rounded-circle me-2' style={{ display: "block", width:"100%", padding: 30}} src='https://i1.sndcdn.com/avatars-000138404358-sdp2xr-t500x500.jpg'></img>
      <Form className="mx-auto bg-black">
        <Row className="me-1 mx-auto" >
          <Form.Group as={Row} controlId="formProfileBar">
            <Form.Label>Usuario</Form.Label>
            <Form.Label>Bio</Form.Label>
            <Form.Label>Followers/Following</Form.Label>
            <Form.Label>Email</Form.Label>
            <Form.Label>url</Form.Label>
          </Form.Group>
        </Row>
        <Row className="me-1 mx-auto" >
          <Form.Group as={Row}  controlId="formPostBar">
            <Button onClick={followUser} variant="dark" type="submit">Follow</Button> 
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
export default ProfileBar;