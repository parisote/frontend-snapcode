import React, { useState, useContext, useEffect} from 'react'
import AuthContext from '../context/Auth-context';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import apiClient from '../services/apiClient';

function CommentView(props) {
  const ctx = useContext(AuthContext)
  const { comment } = props
  const [profile, setProfile] = useState(null)
  const date = new Date(comment.createdAt)
  const [likes, setLikes] = useState(comment.likedBy.length)
  const [liked, setLiked] = useState(() => {
    const userLiked = comment.likedBy.find(e => e.id === ctx.userId)
    if (userLiked) return true
    return false
  })

/*
  const likePost = async () => {
    const response = await apiClient.post(`/api/user/${ctx.userId}/like/post/${post.id}`)
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
*/

  useEffect(() => {
    apiClient.get(`/api/user/profile/${comment.authorId}`).then(parseProfile)
  }, []);

  const parseProfile = (res) => setProfile(res.data)
  console.log(profile)

  if (!profile) {
    return <></>
  }
  

  const handleSubmit = async (event) => 
  {
  }
  return (
    <div className="row gx-0  text-white">
        <Row className="me-1 p-1 mx-auto">
            <div className='d-flex'>
            <img src={`https://vsa-bucket-test.s3.sa-east-1.amazonaws.com/${profile.pfp}`} alt='alt' className='img-fluid rounded-circle' style={{ maxHeight: '40px' }}></img>
            <p className='mx-1 mt-2 text-info'>
              {profile.username}
            </p>
            <p className='mx-1 fw-light fst-italic' style={{ fontSize: '0.8em', marginTop: '12px' }}>
              commented at: {/*date.toLocaleDateString() + ' - ' + date.toLocaleTimeString()*/}
            </p>
            
            </div>
            <Col sm={12} className="p-1"> <Form.Control as="textarea" id="text" className='bg-black text-white square border-secondary' rows={4} style={{ fontSize: 11 }}  size="sm" value={comment.text} /> </Col>
            <div className='d-flex'>
                  {liked ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star-fill mt-2 ms-auto text-info" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg> :
                  !liked &&
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-star mt-2 ms-auto text-info" viewBox="0 0 16 16">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                  </svg>
                }
                <p className='mt-2 mx-1 text-secondary'>
                  {likes}
                </p> 
            </div>
        </Row>
    </div>
  );
}
export default CommentView;