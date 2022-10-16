import React, { useContext } from 'react'
import AuthContext from '../context/Auth-context';
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";

import Form from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { postApi } from '../services/apiClient';



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
    <div className="square border rounded-end rounded-start m-1 mx-auto text-white border-secondary">
    <Form className="mx-auto">
      <Row className="me-1 p-1 mx-auto">
        <Form.Group as={Row}  controlId="formPostBar">
          <Col sm={12} className="p-1"> <Form.Control as="textarea" id="text" className='bg-dark text-white square border-secondary' rows={2} style={{fontSize: 11}} placeholder="Enter Title Here" size="sm"/> </Col>
          <Col sm={12} className="p-1"> <Form.Control as="textarea" id="tags"className='bg-dark text-white border-secondary' rows={2} style={{fontSize: 11}} placeholder="Enter Tags" size="sm"/></Col>
          <span sm={12} className="p-1"><Col sm={4}> <Form.Control id="filaName" type="text"  className='bg-dark text-white border-secondary' style={{fontSize: 11}} placeholder="Enter file name" size="sm"/> </Col></span>
        </Form.Group>
      </Row>
      <Row className="me-1 p-1 mx-auto">
        <Form.Group controlId="formEditor">
            <Col sm={12} className="">
              <Editor id='monacoEditor'
                defaultLanguage='c#'
                height="20vh"
                theme="vs-dark"
                />
            </Col>
        </Form.Group>
      </Row>
      <Row className="me-1 pt-1 pb-2 mx-auto">
        <Form.Group as={Row}  controlId="formFooterBar">
          <Col sm={6} className='d-flex justify-content-start'>
          <Form.Select size="sm" className='bg-dark text-white border-secondary'>
              <option>Select Language</option>
              <option value="1">Java</option>
              <option value="2">JavaScript</option>
              <option value="3">Three</option>
          </Form.Select>
          </Col>
          <Col sm={2} className='d-flex justify-content-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" fill="currentColor" class="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z"/>
            </svg>
          </Col>
          <Col sm={4} className='d-flex justify-content-end'><Button className='border-secondary' sm={12} onClick={handleSubmit} size="sm" variant="dark" type="submit">Post</Button></Col>
        </Form.Group>
      </Row>
    </Form>
    </div>
  );
}
export default PostEditor;