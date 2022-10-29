import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PostView from '../components/PostView';
import AuthContext from '../context/Auth-context';
import apiClient from '../services/apiClient';
const Trending = () => {

    const ctx = useContext(AuthContext)
    const location = useLocation()

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState(null)

    const data = {
        ...user,
        ...profile,
    }

    const renderPosts = () => {
        return (
            <>{posts.map(post => (<PostView user={data} post={post} key={post.id} />))}</>
        )
    }

    //esto y lo proximo deberia ir idealmente en un hook
    useEffect(() => {
        let userId

        if (!location.state) {
            userId = ctx.userId
        } else {
            userId = location.state.id
        }

        Promise.all([
            apiClient.get(`/api/user/${userId}`).then(parseUser),
            apiClient.get(`/api/user/profile/${userId}`).then(parseProfile),
            apiClient.get(`/api/trending`).then(parsePosts),
        ]).catch(() => ctx.onLogout())
    }, [ctx.token]);
    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)
    const parsePosts = (res) => setPosts(res.data)

    if (!profile || !user || !posts) {
        return <div className='bg-dark min-vh-100'>loading</div>
    }

    return (
        <div className="d-flex align-items-center justify-content-center bg-black text-light min-vh-100">
            <div className='d-flex align-items-start w-75 min-vh-100'>
                <div className="col-md-2 mt-2">
                </div>
                <div className="col-md-8 mt-8">
                    {renderPosts()}
                </div>
                <div className="col-md-2 mt-2">
                </div>
            </div>
        </div>
    );
}

export default Trending;