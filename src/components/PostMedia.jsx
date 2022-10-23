import React, { useState, useContext } from 'react';
import { postApi } from '../services/apiClient';
import AuthContext from '../context/Auth-context';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PostMedia(props) {
  const ctx = useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsFileSelected] = useState(false);
  const [tags, setTags] = useState(null)
  const [error, setError] = useState(false)
  const [errorMsj, setErrorMsj] = useState()
  const [title, setTitle] = useState(null)

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileSelected(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value.trim())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // handleNoError()
    let newError, errorActual
    if (!title) {
      errorActual = " Debe poner un texto en el post"
      newError = newError ? newError + " - " + errorActual : errorActual
    }

    if (!newError) {
      const newPost = {
        title: title,
        tags: tags,
        code: null,
        fileName: selectedFile.name,
        language: "Java",
      }

      let response = await postApi.post("/" + ctx.userId, newPost);
      if (response.status === 201) {
        console.log('201')
        window.location.reload()
      }

      else {
        errorActual = "Error al crear POST"
        newError = newError ? newError + " - " + errorActual : errorActual
      }
    }
    else {
      handleError(newError)
      event.preventDefault()
    }

    const handleError = (error) => {
      setErrorMsj(error)
      setError(true)
    }

    const handleNoError = () => {
      setErrorMsj("")
      setError(false)
    }

  };


  return (
    //  <div>
    // 		<input type="file" name="file" onChange={changeHandler} />
    // 		{isSelected ? (
    // 			<div>
    // 				<p>Filename: {selectedFile.name}</p>
    // 				<p>Filetype: {selectedFile.type}</p>
    // 				<p>Size in bytes: {selectedFile.size}</p>
    // 				<p>
    // 					lastModifiedDate:{' '}
    // 					{selectedFile.lastModifiedDate.toLocaleDateString()}
    // 				</p>
    // 			</div>
    // 		) : (
    // 			<p>Select a file</p>
    // 		)}
    // 		<div>
    // 			<button onClick={handleSubmit}>Submit</button>
    // 		</div>
    // 	</div>
    <div className="square border rounded-end rounded-start m-1 mx-auto text-white border-secondary bg-dark">
      <Form className="mx-auto" onSubmit={handleSubmit} >

        {/* <input type="file" name="file" onChange={changeHandler} />
          {isSelected ? ( */}

        <Row className="me-1 p-1 mx-auto">
          <Form.Group as={Row}>
            <Col sm={12} className="p-1">
              <Form.Control as="textarea" onChange={handleTitleChange} id="title" className='bg-dark text-white border-secondary'
                rows={2} style={{ fontSize: 11 }} placeholder="Titulo" size="sm" />
            </Col>
            <Col sm={12} className="p-1"> <Form.Group controlId="formFile" className="mb-3" >
              <Form.Control type="file" onChange={changeHandler} className='bg-dark text-white border-secondary' />
            </Form.Group> </Col>
            <Col sm={6} className='d-flex justify-content-end'><Button className='border-secondary' sm={12} size="sm" variant="dark" type="submit">Post</Button></Col>
            <Col sm={12} className='p-2'>
              {error ? <div className="d-flex justify-content-center alert alert-danger" sm={12} role="alert"> {errorMsj} </div>
                : <></>}
            </Col>
          </Form.Group>
        </Row>

        {/* <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{' '}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p> */}
      </Form>
    </div>
  )

}
export default PostMedia;