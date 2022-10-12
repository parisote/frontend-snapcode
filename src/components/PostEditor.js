import React, { useContext } from 'react'
import AuthContext from '../context/Auth-context';
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";

import Form from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



function PostEditor(props) {
  const ctx = useContext(AuthContext)
  

  const handleSubmit = (event) =>{
      alert("Post")
      return
  }

  const copyPost = (event) =>{
      alert("Copy")
      return
  }

//Ocultar boton POST cuando es modo vista
//Editor no habilitado cuando es modo vista

  return (
    <div className="square border rounded-end rounded-start col-md-6 m-1 mx-auto" >
    <Form className="mx-auto">
      <Row className="me-1 mx-auto" >
        <Form.Group as={Row}  controlId="formPostBar">
          <Form.Label column sm={1} size="sm" className='justify-content-start'> {props.idUsuario} </Form.Label>
          <Col sm={10}> <Form.Control placeholder="Enter Title Here" size="sm" className='justify-content-between' /> </Col>
          <Form.Label column sm={1} size="sm" className='justify-content-end'>11/01/2022</Form.Label>
          <Col sm={12}> <Form.Control placeholder="Enter Tags" size="sm" className='justify-content-between' /></Col>
        </Form.Group>
      </Row>
      <Row className="me-1 mx-auto">
        <Form.Group controlId="formEditor">
            <Col sm={12} className="">
              <Editor
                defaultLanguage='c#'
                height="15vh"
                theme="vs-dark"
                />
            </Col>
        </Form.Group>
      </Row>
      <Row className="me-1 p-1 mx-auto">
        <Form.Group as={Row} controlId="formFooterBar">
          <Col sm={6}><Form.Select size="sm">
              <option>Select Language</option>
              <option value="1">Java</option>
              <option value="2">JavaScript</option>
            <option value="3">Three</option>
          </Form.Select>
          </Col>
          <Col sm={2} className='justify-content-center'> <Button onClick={copyPost} size="md" variant="dark">Copy</Button></Col>
          <Col sm={2} className='justify-content-end'> <Button onClick={handleSubmit} size="md" variant="dark" type="submit">Post</Button> </Col>
        </Form.Group>
      </Row>
    </Form>
    </div>
  );
}
export default PostEditor;