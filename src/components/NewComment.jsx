import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../context/Auth-context';
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import apiClient from '../services/apiClient';

function NewComment(props) {
  const ctx = useContext(AuthContext)
  const { post } = props
  const [profile, setProfile] = useState(null)
  const [txtComment, setNewComment] = useState(null)
  const [error, setError] = useState(false)
  const [errorMsj, setErrorMsj] = useState()
  const navigate = useNavigate()
  
  useEffect(() => {
    apiClient.get(`/api/user/profile/${ctx.userId}`).then(parseProfile)
  }, []);

  const parseProfile = (res) => setProfile(res.data)
  console.log(profile)

  if (!profile) {
    return <></>
  }
  const handleCommentChange = (event) => {
    setNewComment(event.target.value.trim())
  }

  const handleSubmit = async (event) => 
  {
    event.preventDefault()
    handleNoError()
    let newError, errorActual
    if (!txtComment) {
      errorActual = " Debe poner un texto en el comentario"
      newError = newError ? newError + " - " + errorActual : errorActual
    }

    if (!newError) {
      const comment = {
        text: txtComment,
        imageUrl: "",
        authorId: ctx.userId
      }

      let response = await apiClient.post(`/api/post/${post.id}/comment`, comment);
      if (response.status === 201) {
        console.log('201')
        navigate("/post", { state: { post: post } })
        window.location.reload()
      }

      else {
        errorActual = "Error al crear comentario"
        newError = newError ? newError + " - " + errorActual : errorActual
      }
    }
    else {
      handleError(newError)
      event.preventDefault()
    }
  }

  const handleError = (error) => {
    setErrorMsj(error)
    setError(true)
  }

  const handleNoError = () => {
    setErrorMsj("")
    setError(false)
  }
  return (
    <div className="row gx-0 mt-2 border rounded border-secondary p-2 text-white">
      <Form className="mx-auto" onSubmit={handleSubmit} >
        <Row className="me-1 p-1 mx-auto">
          <Form.Group as={Row}>         
            <div className='d-flex'>
            <img src={`https://vsa-bucket-test.s3.sa-east-1.amazonaws.com/${profile.pfp}`} alt='alt' className='img-fluid rounded-circle' style={{ maxHeight: '40px' }}></img>
            <p className='mx-1 mt-2 text-info'>
              {profile.username}
            </p>
            </div>
            <Col sm={12} className="p-1"> <Form.Control as="textarea" onChange={handleCommentChange} id="text" className='bg-black text-white square border-secondary' rows={4} style={{ fontSize: 11 }} placeholder="Leave a comment" size="sm" /> </Col>
            <Col sm={12} className='d-flex justify-content-end'><Button className='border-secondary' sm={12} size="sm" variant="success" type="submit">Comment</Button></Col>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
export default NewComment;