import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PostViewExtended from '../components/PostViewExtended';
import NewComment from '../components/NewComment';
import CommentView from '../components/CommentView';
import AuthContext from '../context/Auth-context';
import apiClient from '../services/apiClient';
import { sortCommentaries } from '../utils/utilities';

const Trending = () => {

    const ctx = useContext(AuthContext)
    const location = useLocation()

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [post, setPost] = useState(null)
    
    let userId

    if (!location.state) {
        userId = ctx.userId
    } else {
        userId = location.state.id
    }

    let postId =22
    //postId = location.state.id
    

    const data = {
        ...user,
        ...profile,
    }

    const renderPost = () => {
        return (
            <>{<PostViewExtended user={data} post={post} key={post.id} />}</>
        )
    }

    const renderNewComment = () => {
        return (
            <>{<NewComment user={data} post={post} key={post.id} />}</>
        )
    }

    const renderComment = () => {
        const sortedComentaries = sortCommentaries(post.commentaries, 'date')
        return (
            <>{sortedComentaries.map(comment => (<CommentView user={data} comment={comment} key={comment.id} />))}</>
        )
    }


    //esto y lo proximo deberia ir idealmente en un hook
    useEffect(() => {
        apiClient.get(`/api/user/${userId}`).then(parseUser)
        apiClient.get(`/api/user/profile/${userId}`).then(parseProfile)
        apiClient.get(`/api/post/${postId}`).then(parsePost)
        // apiClient.get(`/api/user/following/${ctx.userId}`)
    }, []);
    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)
    const parsePost = (res) => setPost(res.data)

    if (!profile || !user || !post) {
        return <div className='bg-dark min-vh-100'>loading</div>
    }

    return (
        <div className="d-flex align-items-center justify-content-center bg-black text-light min-vh-100">
            <div className='d-flex align-items-start w-75 min-vh-100'>
                <div className="col-md-2 mt-2">
                </div>
                <div className="col-md-8 mt-8">
                    {renderPost()}
                    <hr style={{height:"5px"}}/>
                    {renderNewComment()}
                    <p className='mx-1 mt-2 text-info'>
                    Comments:
                    </p>
                    {renderComment()}
                </div>
                <div className="col-md-2 mt-2">

                </div>
            </div>
        </div>
    );
}

export default Trending;