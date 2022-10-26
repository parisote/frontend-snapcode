import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PostViewExtended from '../components/PostViewExtended';
import NewComment from '../components/NewComment';
import CommentView from '../components/CommentView';
import AuthContext from '../context/Auth-context';
import apiClient from '../services/apiClient';
import { sortCommentaries } from '../utils/utilities';

const Post = () => {

    const ctx = useContext(AuthContext)
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [post, setPost] = useState(null)
    //useState(location.state.post)

    const data = {
        ...user,
        ...profile,
    }

    useEffect(() => {
        apiClient.get(`/api/user/${ctx.userId}`).then(parseUser)
        apiClient.get(`/api/user/profile/${ctx.userId}`).then(parseProfile)
        apiClient.get(`/api/post/${location.state.post.id}`).then(parsePost)
    }, []);

    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)
    const parsePost = (res) => setPost(res.data)
    console.log(location.state.post.id)
    console.log(post)
    if (!profile) {
        return <></>
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
        console.log(sortedComentaries)
        return (
            <>{sortedComentaries.map(comment => (<CommentView user={data} comment={comment} key={comment.id} />))}</>
        )
    }


    return (
        <div className="d-flex align-items-center justify-content-center bg-black text-light min-vh-100">
            <div className='d-flex align-items-start w-75 min-vh-100'>
                <div className="col-md-2 mt-2">
                </div>
                <div className="col-md-8 mt-8">
                    {renderPost()}
                    <hr style={{ height: "5px" }} />
                    {renderNewComment()}
                    <p className='mx-1 mt-2 text-info'>
                        Comments:
                    </p>
                    {renderComment()}
                </div>
                <div className="col-md-2 mt-2">
                </div>
            </div>
        </div >
    );
}

export default Post;