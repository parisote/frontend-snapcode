import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileBar from '../components/ProfileBar';
import PostView from '../components/PostView';
import ProfileTopBar from '../components/ProfileTopBar';
import apiClient from '../services/apiClient';
import AuthContext from '../context/Auth-context';
import { sortPosts } from '../utils/utilities';


const Profile = () => {
    const ctx = useContext(AuthContext)
    const location = useLocation()

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState(null)
    let userId

    if (!location.state) {
        userId = ctx.userId
    } else {
        userId = location.state.id
    }

    //esto y lo proximo deberia ir idealmente en un hook
    useEffect(() => {
        apiClient.get(`/api/user/${userId}`).then(parseUser)
        apiClient.get(`/api/user/profile/${userId}`).then(parseProfile)
        apiClient.get(`/api/post/user/${userId}`).then(parsePosts)
        // apiClient.get(`/api/user/following/${ctx.userId}`)
    }, []);
    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)
    const parsePosts = (res) => setPosts(res.data.post)

    if (!profile || !user || !posts) {
        return <div>loading...</div>
    }

    const data = {
        ...user,
        ...profile,
    }

    const renderPosts = () => {
        const sortedPosts = sortPosts(posts, 'date')
        return (
            <>{sortedPosts.map(post => (<PostView user={data} post={post} key={post.id} />))}</>
        )
    }

    return (
        <div className="d-flex align-items-center justify-content-center bg-black text-light min-vh-100">
            <div className='d-flex align-items-start w-75 min-vh-100'>
                <div className="col-md-1 mt-3">
                </div>
                <div className="col-md-3 mt-3">
                    <ProfileBar {...data} />
                </div>
                <div className="h-card col-md-7 mt-3">
                    <ProfileTopBar />
                    {renderPosts()}
                    {/* {!posts && <p>loading...</p>}
                    {posts && <p>hay posts</p>} */}
                </div>
            </div>
        </div>
    )
}
export default Profile;

//