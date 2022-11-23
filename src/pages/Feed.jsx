import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import PostView from '../components/PostView';
import AuthContext from '../context/Auth-context';
import apiClient from '../services/apiClient';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Feed = () => {

    const ctx = useContext(AuthContext)
    const location = useLocation()

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)
    const [posts, setPosts] = useState(null)
    const [showFilters, setShowFilters] = useState(false)
    const [titleFilter, setTitleFilter] = useState()
    const [fromFilter, setFromFilter] = useState()
    const [toFilter, setToFilter] = useState()
    const [isFiltered, setIsFiltered] = useState(false)
    const [dateError, setDateError] = useState(false)


    const handleCloseFilters = () => setShowFilters(false);
    const handleShowFilters = () => {
        setTitleFilter()
        setFromFilter()
        setToFilter()
        setShowFilters(true)
    }

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
        if (fromFilter && toFilter && new Date(fromFilter).getTime() > new Date(toFilter).getTime()){
            handleError("From Cannot be greater than To")
            return
        } 
        (!titleFilter && !fromFilter && !toFilter) ? setIsFiltered(false) : setIsFiltered(true)     
        handleCloseFilters()
        apiClient.get(`/api/post/user/feed/filter/${userId}?title=${titleFilter}&from=${fromFilter}&to=${toFilter}`).then(parsePosts)
        renderPosts()
    }

    const handleError = (error) => {
        toast.error(error)
        setDateError(true)
      }

    const clearFilters = () => {
        setIsFiltered(false)
        apiClient.get(`/api/post/user/feed/${userId}`).then(parsePosts)
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
                                className="me-2 bg-light border-0 rounded text-dark w-40 p-2"
                                aria-label="Search"
                                size='sm'
                                onChange={(e) => setTitleFilter(e.target.value.trim())}
                            />
                            <label className='text-light'>from</label>
                            <input onChange={(e) => setFromFilter(e.target.value)} type="date" className='m-1 p-2 bg-light text-dark border-0 rounded text-light'/>
                            <label className='text-light'>to</label>
                            <input onChange={(e) => setToFilter(e.target.value)} type="date" className='m-1 p-2 bg-light text-dark border-0 rounded text-light'/>
                            <button onClick={applyFilters} className="btn btn-dark m-2 border-secondary">Apply</button>
                        </div>
                    </Modal.Body>
            </Modal>

            {dateError ? <ToastContainer position="bottom-center" autoClose={3000}/> : <></>}

            <div className='bg-black text-light'>
                <button onClick={handleShowFilters} className="btn btn-dark m-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter-left mx-1" viewBox="0 0 16 16">
                        <path d="M2 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                    filters
                </button>
                {isFiltered? <button onClick={clearFilters} className="btn btn-danger m-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace mx-1" viewBox="0 0 16 16">
                                    <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z"/>
                                    <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z"/>
                                </svg>
                                clear filters
                                </button> : <></>}
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