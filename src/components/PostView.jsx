import React, { useContext, useEffect, useState } from 'react'
// import AuthContext from '../context/Auth-context';
import Editor from "@monaco-editor/react";
import themeData from '../utils/monacoConfigs'
import Tag from './Tag';
import AuthContext from '../context/Auth-context';
import apiClient from '../services/apiClient';
import { useNavigate } from 'react-router-dom';

function PostView(props) {
  const ctx = useContext(AuthContext)
  const navigate = useNavigate()
  const { post } = props
  const [profile, setProfile] = useState(null)
  const [likes, setLikes] = useState(post.likedBy.length)
  const [liked, setLiked] = useState(() => {
    const userLiked = post.likedBy.find(e => e.id === ctx.userId)
    if (userLiked) return true
    return false
  })

  const date = new Date(post.createdAt)

  const likePost = async () => {
    const response = await apiClient.post(`/api/user/${ctx.userId}/like/post/${post.id}`, { headers: { Authorization: `Bearer ${ctx.token}` } })
    if (response.status === 200) {
      if (!liked) {
        setLiked(() => !liked)
        setLikes(() => (likes + 1))
      } else {
        setLiked(() => !liked)
        setLikes(() => (likes - 1))
      }
    }
  }

  useEffect(() => {
    apiClient.get(`/api/user/profile/${post.authorId}`, { headers: { Authorization: `Bearer ${ctx.token}` } }).then(parseProfile)
  }, []);

  const parseProfile = (res) => setProfile(res.data)

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

  const renderTags = () => {
    if (!post.tags) {
      return <></>
    }
    const tags = post.tags.split(',')
    return (
      <>{tags.map(name => (<Tag text={name} key={name} />))}</>
    )
  }

  const navigateToPost = () => {
    navigate("/post", { state: { post: post } })
    window.location.reload()
  }

  if (!profile) {
    return <></>
  }

  return (
    <div className='container-fluid text-white bg-black mt-3'>
      <div className='row gx-0'>
        <div className='d-flex'>
          <img src={`https://vsa-bucket-test.s3.sa-east-1.amazonaws.com/${profile.pfp}`} alt='alt' className='img-fluid rounded-circle' style={{ maxHeight: '40px' }}></img>
          <p className='mx-1 mt-2 text-info'>
            {profile.username}
          </p>
          <p className='mt-2 text-secondary'>/</p>
          <p className='mx-1 mt-2 fw-bold text-info'>
            Filename.ext
          </p>
          <p className='mx-1 fw-light fst-italic' style={{ fontSize: '0.8em', marginTop: '12px' }}>
            {date.toLocaleDateString() + ' - ' + date.toLocaleTimeString()}
          </p>
          {liked ?
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill mt-2 ms-auto text-info" viewBox="0 0 16 16" onClick={likePost}>
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg> :
            !liked &&
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star mt-2 ms-auto text-info" viewBox="0 0 16 16" onClick={likePost}>
              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
            </svg>
          }

          <p className='mt-2 mx-1 text-secondary'>
            {likes}
          </p>
        </div>
        <div className='row gx-0'>
          <div className='container mx-4'>
            {post.text}
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
            defaultLanguage={post.code.language}
            defaultValue={post.code.value}
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
        <div className='d-flex flex-order-1 flex-md-order-none'>
          <div className='d-flex flex-order-1 flex-md-order-none'>{renderTags()}</div>
          <div className='d-flex flex-order-1 flex-md-order-none ms-auto mt-2' onClick={navigateToPost}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-up-right text-secondary mx-1" viewBox="0 0 16 16">
              <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
              <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
            </svg>
          </div>
        </div>
      </div>
      {/* <div className='border-bottom border-secondary mt-2'></div> */}
    </div>
  );
}
export default PostView;