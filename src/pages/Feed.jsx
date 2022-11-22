import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PostView from '../components/PostView';
import AuthContext from '../context/Auth-context';
import apiClient from '../services/apiClient';
import Modal from 'react-bootstrap/Modal';

const Feed = () => {

    const ctx = useContext(AuthContext)
    const location = useLocation()

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [titleFilter, setTitleFilter] = useState()

    const handleCloseFilters = () => setShowFilters(false);
    const handleShowFilters = () => setShowFilters(true);

    let userId

    if (!location.state) {
        userId = ctx.userId
    } else {
        userId = location.state.id
    }

    const data = {
        ...user,
        ...profile,
    }

    const renderPosts = () => {
        if (posts.length < 1) {
            return (<div className='text-white fs-1 mx-4 mt-5'>Start following people to lighten up your feed!</div>)
        }
        return (
            <>{posts.map(post => (<PostView user={data} post={post} key={post.id} />))}</>
        )
    }

    const applyFilters = () => {
        console.log(titleFilter)
        handleCloseFilters()
        apiClient.get(`/api/post/user/feed/filter/${userId}?title=${titleFilter}&from=null&to=null`).then(parsePosts)
        renderPosts()
    }

    //esto y lo proximo deberia ir idealmente en un hook
    useEffect(() => {
        apiClient.get(`/api/user/${userId}`).then(parseUser)
        apiClient.get(`/api/user/profile/${userId}`).then(parseProfile)
        apiClient.get(`/api/post/user/feed/${userId}`).then(parsePosts)
        // apiClient.get(`/api/user/following/${ctx.userId}`)
    }, []);
    const parseUser = (res) => setUser(res.data)
    const parseProfile = (res) => setProfile(res.data)
    const parsePosts = (res) => setPosts(res.data)

    if (!profile || !user || !posts) {
        return <div className='bg-dark min-vh-100'>loading</div>
    }

    return (
        <>
            <Modal size="xl" show={showFilters} onHide={handleCloseFilters} backdrop="static" keyboard={false}>
                    <Modal.Header className="bg-dark text-white" closeButton>
                        <Modal.Title className="bg-dark text-white" >Filter posts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-dark text-white">
                        <div className="d-flex align-items-center justify-content-center"> 
                            <input
                                type="search"
                                placeholder="Filter by title"
                                className="me-2 bg-black border-0 rounded text-light w-40 p-2"
                                aria-label="Search"
                                size='sm'
                                onChange={(e) => setTitleFilter(e.target.value)}
                            />
                            <label className='text-light'>from</label>
                            <input type="date" className='m-1 p-2 bg-black border-0 rounded text-light'/>
                            <label className='text-light'>to</label>
                            <input type="date" className='m-1 p-2 bg-black border-0 rounded text-light'/>
                            <button onClick={applyFilters} className="btn btn-dark m-2 border-secondary">Apply</button>
                        </div>
                    </Modal.Body>
            </Modal>
            <div className='bg-black text-light'>
                <button onClick={handleShowFilters} className="btn btn-dark m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left" viewBox="0 0 16 16">
                        <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    filters
                </button>
                <div className="d-flex align-items-center justify-content-center min-vh-100">
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
            </div>
        </>
    );
}

export default Feed;