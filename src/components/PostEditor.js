import React, { useState, useContext, useRef } from 'react'
import AuthContext from '../context/Auth-context';
import Editor from "@monaco-editor/react";
import themeData from '../utils/monacoConfigs'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import apiClient from '../services/apiClient';

function PostEditor(props) {
  const ctx = useContext(AuthContext)

  const [title, setTitle] = useState(null)
  const [tags, setTags] = useState(null)
  const [language, setLanguage] = useState(null)
  const [visibility, setVisibility] = useState(Number(0))
  const [fileName, setFileName] = useState(null)

  const [error, setError] = useState(false)
  const [errorMsj, setErrorMsj] = useState()

  const monacoRef = useRef(null);



  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    // console.log("onMount: the editor instance:", editor);
    // console.log("onMount: the monaco instance:", monaco)
    monaco.current = editor;
    monaco.editor.defineTheme('my-theme', themeData);
    monaco.editor.setTheme('my-theme')
    monacoRef.current = editor;
  }

  function handleEditorWillMount(monaco) {
    // console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // marke
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value.trim())
  }
  const handleTagsChange = (event) => {
    setTags(event.target.value)
  }
  const handleLanguageChange = (event) => {
    var index = event.target.selectedIndex;
    let lang = event.target[index].text
    setLanguage(lang);
    monacoRef.current.updateOptions({
      language: lang
    });
    window.monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], lang)
  }


  const handleVisibiltyChange = (event) => {
    //var index = event.target.selectedIndex;
    //let visibility = event.target[index]
    setVisibility(event.target.selectedIndex);
  }


  const handleFileNameChange = (event) => {
    setFileName(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    handleNoError()
    let newError, errorActual
    if (!title) {
      errorActual = " Debe poner un texto en el post"
      newError = newError ? newError + " - " + errorActual : errorActual
    }

    if (!monacoRef.current.getValue()) {
      errorActual = " Debe completar el post con codigo"
      newError = newError ? newError + " - " + errorActual : errorActual
    }

    if (!language) {
      errorActual = " Debe seleccionar un lenguaje"
      newError = newError ? newError + " - " + errorActual : errorActual
    }


    if (!newError) {
      const newPost = {
        title: title,
        tags: tags,
        code: monacoRef.current.getValue(),
        fileName: fileName,
        language: language,
        visibility: visibility,
      }

      console.log(newPost)

      let response = await apiClient.post("/api/post/" + ctx.userId, newPost);
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
    <div className="square border rounded-end rounded-start m-1 mx-auto text-white border-secondary bg-dark">
      <Form className="mx-auto" onSubmit={handleSubmit} >
        <Row className="me-1 p-1 mx-auto">
          <Form.Group as={Row}>
            <Col sm={12} className="p-1"> <Form.Control as="textarea" onChange={handleTitleChange} id="text" className='bg-dark text-white square border-secondary' rows={2} style={{ fontSize: 11 }} placeholder="Enter Title Here" size="sm" /> </Col>
            <Col sm={12} className="p-1"> <Form.Control as="textarea" onChange={handleTagsChange} id="tags" className='bg-dark text-white border-secondary' rows={2} style={{ fontSize: 11 }} placeholder="Enter Tags" size="sm" /></Col>
            <span sm={12} className="p-1"><Col sm={4}> <Form.Control id="filaName" onChange={handleFileNameChange} type="text" className='bg-dark text-white border-secondary' style={{ fontSize: 11 }} placeholder="Enter file name" size="sm" /> </Col></span>
          </Form.Group>
        </Row>
        <Row className="me-1 p-1 mx-auto">
          <Form.Group>
            <Col sm={12} className="">
              <Editor id='monacoEditor'
                defaultLanguage='javascript'
                height="20vh"
                theme='my-theme'
                options={{
                  minimap: {
                    enabled: false
                  },
                  scrollbar: {
                    vertical: 'hidden'
                  },
                  overviewRulerBorder: false
                }}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                beforeMount={handleEditorWillMount}
                onValidate={handleEditorValidation}
              />
            </Col>
          </Form.Group>
        </Row>
        <Row className="me-1 pt-1 pb-1 mx-auto">
          <Form.Group as={Row}>
            <Col sm={6} className='d-flex justify-content-start'>
              <Form.Select onChange={handleLanguageChange} size="sm" className='bg-dark text-white border-secondary'>
                <option>Select Language</option>
                <option value='javascript'>javascript</option>
                <option value='typescript'>typescript</option>
                <option value='java'>java</option>
                <option value='csharp'>csharp</option>
                <option value='c'>c</option>
                <option value='python'>python</option>
              </Form.Select>
            </Col>
            <Col sm={3} className='d-flex justify-content-start'>
              <Form.Select onChange={handleVisibiltyChange} size="sm" className='bg-dark text-white border-secondary'>
                <option value='0'>Publico</option>
                <option value='1'>Privado</option>
              </Form.Select>
            </Col>
            <Col sm={3} className='d-flex justify-content-end'><Button className='border-secondary' sm={12} size="sm" variant="success" type="submit">Post</Button></Col>
            <Col sm={12} className='p-2'>
              {error ? <div className="d-flex justify-content-center alert alert-danger" sm={12} role="alert"> {errorMsj} </div>
                : <></>}
            </Col>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}
export default PostEditor;