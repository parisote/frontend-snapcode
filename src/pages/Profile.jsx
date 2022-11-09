import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import ProfileBar from '../components/ProfileBar';
import PostView from '../components/PostView';
import ProfileTopBar from '../components/ProfileTopBar';
import apiClient from '../services/apiClient';
import AuthContext from '../context/Auth-context';
import { sortPosts } from '../utils/utilities';
import ProfileForm from '../components/ProfileForm';


const Profile = () => {
    const ctx = useContext(AuthContext)
    const location = useLocation()

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [toggle, setToggle] = useState(false)
    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [followers, setFollowers] = useState(null)
    const [followings, setFollowings] = useState(null)
    const [posts, setPosts] = useState(null)
    const [likedPosts, setLikedPosts] = useState(null)

    let userId

    if (!location.state) {
        userId = ctx.userId
    } else {
        userId = location.state.id
    }

    //esto y lo proximo deberia ir idealmente en un hook
    useEffect(() => {
        if (!ctx.token) {
            return
        }
        Promise.all([
            apiClient.get(`/api/user/${userId}`).then(parseUser),
            apiClient.get(`/api/user/profile/${userId}`).then(parseProfile),
            apiClient.get(`/api/post/user/${userId}`).then(parsePosts),
            apiClient.get(`/api/post/user/liked/${userId}`).then(parseLikedPosts),
            apiClient.get(`/api/user/followers/${userId}`).then(parseFollowers),
            apiClient.get(`/api/user/following/${userId}`).then(parseFollowings),
        ]).catch((error) => {
            if (error.response.status === 401) {
                ctx.onLogout()
            }
            if (error.response.status === 500) {
                setProfile(() => 500)
            }
        })
    }, [ctx.token, userId]);
    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)
    const parseFollowers = (res) => setFollowers(res.data)
    const parseFollowings = (res) => setFollowings(res.data)
    const parsePosts = (res) => setPosts(res.data)
    const parseLikedPosts = (res) => setLikedPosts(res.data)

    const data = {
        ...user,
        ...profile,
        followers: followers,
        followings: followings
    }

    if (profile === 500 && user) {
        const data1 = {
            userId: user.id,
            username: '',
            name: '',
            biography: '',
            workingAt: '',
            location: '',
            linkedIn: '',
            twitter: '',
        }

        return <div className='bg-dark min-vh-100'><ProfileForm show={show} handleClose={handleClose} data={data1} /></div>
    }

    if ([user, profile, posts, followers, followings, likedPosts].some(e => !e)) {
        return <div className='bg-dark min-vh-100 text-white'>loading</div>
    }

    const renderPosts = () => {
        const sortedPosts = sortPosts(posts, 'date')
        return (
            <>{sortedPosts.map(post => (<PostView post={post} key={post.id} />))}</>
        )
    }

    const renderLikedPosts = () => {
        const sortedPosts = sortPosts(likedPosts[0].likedPosts, 'date')
        return (
            <>{sortedPosts.map(post => (<PostView post={post} key={post.id} />))}</>
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
                    <ProfileTopBar toggle={toggle} setToggle={setToggle} />
                    {
                        !toggle ?
                            renderPosts()
                            :
                            toggle &&
                            renderLikedPosts()
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile;

//