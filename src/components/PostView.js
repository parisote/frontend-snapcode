import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/Auth-context';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import themeData from '../utils/monacoConfigs'

function PostView(props) {
  const ctx = useContext(AuthContext)

  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    console.log("onMount: the editor instance:", editor);
    console.log("onMount: the monaco instance:", monaco)
    monaco.editor.defineTheme('my-theme', themeData);
    monaco.editor.setTheme('my-theme')
  }

  function handleEditorWillMount(monaco) {
    console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  return (
    <div className='container-fluid text-white bg-black mt-3'>
      <div className='row gx-0'>
        <div className='d-flex'>
          <img src={`https://cdn.wallpapersafari.com/71/8/mFdy4l.jpg`} className='img-fluid rounded-circle' style={{ maxHeight: '40px' }}></img>
          <p className='mx-1 mt-2 text-info'>
            harushishi
          </p>
          <p className='mt-2 text-secondary'>/</p>
          <p className='mx-1 mt-2 fw-bold text-info'>
            Filename.ext
          </p>
          <p className='mx-1 fw-light fst-italic' style={{ fontSize: '0.8em', marginTop: '12px' }}>
            15 Sept. 05:00AM
          </p>
        </div>
        <div className='row gx-0'>
          <div className='container mx-4'>
            This is an example of a description of the following code :D
            This is an example of a description of the following code :D
          </div>
          {/* {Props.img !== null &&
            <img src={`https://vsa-bucket-test.s3.sa-east-1.amazonaws.com/${Props.img}`}
              className='img-fluid mt-3' style={{ maxWidth: '600px' }}></img>
          }
          {Props.video !== null &&
            <video controls width="600px" className='mt-3'>
              <source src={``}
                type="video/mp4" />
              <source src={``}
                type="video/webm" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          } */}
        </div>
        <div className='row gx-0 mt-2 border rounded border-secondary p-2' style={{ height: '25vh' }}>
          <Editor
            height="20vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
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
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
          />
        </div>
      </div>
      <div className='border-bottom border-secondary mt-2'></div>
    </div>
  );
}
export default PostView;