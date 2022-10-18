import React from 'react'
// import AuthContext from '../context/Auth-context';
import Editor from "@monaco-editor/react";
import themeData from '../utils/monacoConfigs'
import Tag from './Tag';

function PostView(props) {
  // const ctx = useContext(AuthContext)

  function handleEditorChange(value, event) {
    // here is the current value
  }

  function handleEditorDidMount(editor, monaco) {
    // console.log("onMount: the editor instance:", editor);
    // console.log("onMount: the monaco instance:", monaco)
    monaco.editor.defineTheme('my-theme', themeData);
    monaco.editor.setTheme('my-theme')
  }

  function handleEditorWillMount(monaco) {
    // console.log("beforeMount: the monaco instance:", monaco);
  }

  function handleEditorValidation(markers) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  return (
    <div className='container-fluid text-white bg-black mt-3'>
      <div className='row gx-0'>
        <div className='d-flex'>
          <img src={`https://cdn.wallpapersafari.com/71/8/mFdy4l.jpg`} alt='alt' className='img-fluid rounded-circle' style={{ maxHeight: '40px' }}></img>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star mt-2 ms-auto text-info" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
          </svg>
          <p className='mt-2 mx-1 text-secondary'>
            25
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
        <div className='row gx-0 mt-2 border rounded border-secondary p-2' style={{ height: '23vh' }}>
          <Editor
            height="18vh"
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
        <div className='d-flex'>
          {/* <Tag text='JavaScript' />
          <Tag text='React' /> */}
        </div>
      </div>
      {/* <div className='border-bottom border-secondary mt-2'></div> */}
    </div>
  );
}
export default PostView;