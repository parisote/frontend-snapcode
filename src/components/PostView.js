import React, { useContext } from 'react'
import AuthContext from '../context/Auth-context';
import ReactDOM from "react-dom";
import Editor from "@monaco-editor/react";

import Form from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



function PostView(props) {
  const ctx = useContext(AuthContext)  
   const user = {
    id:1,
    email:"test@gmail.com",
    password:"clave123",
    //relations
  }

  const exmpcode = {
    id:1,
    value:"codigo de prueba",
    language:"JavaScript",
    postId:1
  }

  const comment = {
    id:1,
    text:"comentario de prueba",
    imgUrl:"testurl",
    likedBy: user,
    postId:1,
    author:user,
    authorId: user.id,
  }

  const post={
      id:1,
      createdAt:"20221011",
      updatedAt:"20221011",
      code: exmpcode,
      text:"prueba",
      imgageUrl:"test",
      videoUrl:"test",
      tags:"#hola",
      commentaries: comment,
      author:user,
      likedBy: user,
  }

  const copyPost = (event) =>{
      alert("Copy")
      return
  }
//Ocultar boton POST cuando es modo vista
//Editor no habilitado cuando es modo vista

  return (
    <div className="square border rounded-end rounded-start col-md-6 m-1 mx-auto" >
    <Form className="mx-auto bg-black">
      <Row className="me-1 mx-auto" >
        <Form.Group as={Row}  controlId="formPostBar">
          <Form.Label column sm={2} size="sm" className='justify-content-start post'>{post.author.email}</Form.Label>
          <Form.Label column sm={8} size="sm" className='justify-content-between postTitle'>{post.text}</Form.Label>
          <Form.Label column sm={2} size="sm" className='justify-content-end'> {post.createdAt} </Form.Label>
          <Form.Label column sm={12} size="sm" className='justify-content-start'> {post.tags} </Form.Label>
        </Form.Group>
      </Row>
      <Row className="me-1 mx-auto">
        <Form.Group controlId="formEditor">
            <Col sm={12} className="">
              <Editor
                defaultLanguage='java'
                value= {post.code.value}
                height="15vh"
                theme="vs-dark"
                options={{readOnly: true}}
                />
            </Col>
        </Form.Group>
      </Row>
      <Row className="me-1 p-1 mx-auto">
      <Form.Label column sm={4} size="sm" className='justify-content-start'>{post.code.language}</Form.Label>
      <Col sm={4} className='justify-content-end'> <Button onClick={copyPost} size="sm" variant="dark" type="submit">Likes</Button> </Col>
      <Col sm={2} className='justify-content-end'> <Button onClick={copyPost} size="sm" variant="dark" type="submit">Comments</Button> </Col>
      <Col sm={2} className='justify-content-end'> <Button onClick={copyPost} size="sm" variant="dark" type="submit">Copy</Button> </Col>
      </Row>
    </Form>
    </div>
  );
}
export default PostView;