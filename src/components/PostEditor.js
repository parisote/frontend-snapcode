import React, { useState, useContext, useRef } from 'react'
import AuthContext from '../context/Auth-context';
import Editor from "@monaco-editor/react";
import themeData from '../utils/monacoConfigs'

import Form from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import apiClient, { postApi } from '../services/apiClient';

function PostEditor(props) {
  const ctx = useContext(AuthContext)

  const [title, setTitle] = useState(null)
  const [tags, setTags] = useState(null)
  const [language, setLanguage] = useState(null)
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
  const handleTagsChange = (event) => 
  {
    setTags(event.target.value)
  }
  const handleLanguageChange = (event) => 
  {
    var index = event.target.selectedIndex;
    let lang = event.target[index].text
    setLanguage(lang);
    //monacoRef.current.setModelLanguage(monacoRef.current.getModel(), lang);
    monacoRef.current.updateOptions({
      language: lang
    });
  }

  const handleFileNameChange = (event) => 
  {
    setFileName(event.target.value)
  }
  
  const handleSubmit = async (event) =>
  {
    //alert (monacoRef.current.getValue())
    handleNoError()
    let newError , errorActual
    if (!title) 
    {
      errorActual = " Debe poner un texto en el post"
      newError = newError ? newError +" - " +errorActual :  errorActual
    }
    
    if(!monacoRef.current.getValue())
    {
      errorActual = " Debe completar el post con codigo"
      newError = newError ? newError +" - " +errorActual :  errorActual
    }

    if(!language)
    {
      errorActual = " Debe seleccionar un lenguaje"
      newError = newError ? newError +" - " + errorActual :  errorActual
    }

    if (!newError)
    {
      const newPost = {
        title: title,
        tags : tags,
        code:  monacoRef.current.getValue(),
        fileName: fileName,
        language : language,
      }

      let response = await postApi.post("/"+ctx.userId,newPost);
      if (response.status === 201) 
      {
        return
      } 
      else 
      {
        errorActual = "Error al crear POST"
        newError = newError ? newError +" - " + errorActual :  errorActual
      }
    }
    else
    {
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
    <Form className="mx-auto">
      <Row className="me-1 p-1 mx-auto">
        <Form.Group as={Row}>
          <Col sm={12} className="p-1"> <Form.Control as="textarea" onChange={handleTitleChange} id="text" className='bg-dark text-white square border-secondary' rows={2} style={{fontSize: 11}} placeholder="Enter Title Here" size="sm"/> </Col>
          <Col sm={12} className="p-1"> <Form.Control as="textarea" onChange={handleTagsChange} id="tags"className='bg-dark text-white border-secondary' rows={2} style={{fontSize: 11}} placeholder="Enter Tags" size="sm"/></Col>
          <span sm={12} className="p-1"><Col sm={4}> <Form.Control id="filaName" onChange={handleFileNameChange} type="text"  className='bg-dark text-white border-secondary' style={{fontSize: 11}} placeholder="Enter file name" size="sm"/> </Col></span>
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
              <option value='javaScript'>javaScript</option>
              <option value='typeScript'>typeScript</option>
              <option value='java'>java</option>
              <option value='csharp'>csharp</option>
              <option value='c'>c</option>
              <option value='python'>python</option>
              {/*<option value='abap'>abap</option>
              <option value='aes'>aes</option>
              <option value='apex'>apex</option>
              <option value='azcli'>azcli</option>
              <option value='bat'>bat</option>
              <option value='bicep'>bicep</option>
              <option value='c'>c</option>
              <option value='cameligo'>cameligo</option>
              <option value='clojure'>clojure</option>
              <option value='coffeescript'>coffeescript</option>
              <option value='cpp'>cpp</option>
              <option value='csharp'>csharp</option>
              <option value='csp'>csp</option>
              <option value='css'>css</option>
              <option value='cypher'>cypher</option>
              <option value='dart'>dart</option>
              <option value='dockerfile'>dockerfile</option>
              <option value='ecl'>ecl</option>
              <option value='elixir'>elixir</option>
              <option value='flow9'>flow9</option>
              <option value='freemarker2'>freemarker2</option>
              <option value='freemarker2.tag-angle.interpolation-bracket'>freemarker2.tag-angle.interpolation-bracket</option>
              <option value='freemarker2.tag-angle.interpolation-dollar'>freemarker2.tag-angle.interpolation-dollar</option>
              <option value='freemarker2.tag-auto.interpolation-bracket'>freemarker2.tag-auto.interpolation-bracket</option>
              <option value='freemarker2.tag-auto.interpolation-dollar'>freemarker2.tag-auto.interpolation-dollar</option>
              <option value='freemarker2.tag-bracket.interpolation-bracket'>freemarker2.tag-bracket.interpolation-bracket</option>
              <option value='freemarker2.tag-bracket.interpolation-dollar'>freemarker2.tag-bracket.interpolation-dollar</option>
              <option value='fsharpgo'>fsharpgo</option>
              <option value='graphql'>graphql</option>
              <option value='handlebarshcl'>handlebarshcl</option>
              <option value='html'>html</option>
              <option value='inijava'>inijava</option>
              <option value='javascript'>javascript</option>
              <option value='jsonjulia'>jsonjulia</option>
              <option value='kotlin'>kotlin</option>
              <option value='lesslexon'>lesslexon</option>
              <option value='liquid'>liquid</option>
              <option value='luam3'>luam3</option>
              <option value='markdown'>markdown</option>
              <option value='mipsmsdax'>mipsmsdax</option>
              <option value='mysql'>mysql</option>
              <option value='objective-c'>objective-c</option>
              <option value='pascal'>pascal</option>
              <option value='pascaligo'>pascaligo</option>
              <option value='perl'>perl</option>
              <option value='pgsql'>pgsql</option>
              <option value='php'>php</option>
              <option value='pla'>pla</option>
              <option value='plaintext'>plaintext</option>
              <option value='postiats'>postiats</option>
              <option value='powerquery'>powerquery</option>
              <option value='powershell'>powershell</option>
              <option value='proto'>proto</option>
              <option value='pug'>pug</option>
              <option value='python'>python</option>
              <option value='qsharp'>qsharp</option>
              <option value='r'>r</option>
              <option value='razor'>razor</option>
              <option value='redis'>redis</option>
              <option value='redshift'>redshift</option>
              <option value='restructuredtext'>restructuredtext</option>
              <option value='ruby'>ruby</option>
              <option value='rust'>rust</option>
              <option value='sb'>sb</option>
              <option value='option>scala'>option>scala</option>
              <option value='scheme'>scheme</option>
              <option value='scss'>scss</option>
              <option value='shell'>shell</option>
              <option value='sol'>sol</option>
              <option value='sparql'>sparql</option>
              <option value='sql'>sql</option>
              <option value='st'>st</option>
              <option value='swift'>swift</option>
              <option value='systemverilog'>systemverilog</option>
              <option value='tcl'>tcl</option>
              <option value='twig'>twig</option>
              <option value='typescript'>typescript</option>
              <option value='vb'>vb</option>
              <option value='verilog'>verilog</option>
              <option value='xml'>xml</option>
              <option value='yaml'>yaml</option>
              */}
          </Form.Select>
          </Col>
          {/* comento por ahora
          <Col sm={2} className='d-flex justify-content-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="25" fill="currentColor" className="bi bi-file-earmark-arrow-up-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6.354 9.854a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 8.707V12.5a.5.5 0 0 1-1 0V8.707L6.354 9.854z"/>
            </svg>
          </Col>
          */}
          <Col sm={6} className='d-flex justify-content-end'><Button className='border-secondary' sm={12} onClick={handleSubmit} size="sm" variant="dark" type="submit">Post</Button></Col>
          <Col sm={12} className='p-2'>
          {error? <div className="d-flex justify-content-center alert alert-danger" sm={12} role="alert"> {errorMsj} </div> 
          : <></>}
          </Col>
        </Form.Group>
      </Row>
    </Form>
    </div>
  );
}
export default PostEditor;