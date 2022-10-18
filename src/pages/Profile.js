import React, { useEffect, useState } from 'react'
import ProfileBar from '../components/ProfileBar';
import PostView from '../components/PostView';
import ProfileTopBar from '../components/ProfileTopBar';
import apiClient from '../services/apiClient';
// import AuthContext from '../context/Auth-context';
// import { useContext } from 'react';

const Profile = () => {
    // const ctx = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    const ctxUserId = 1

    useEffect(() => {
        apiClient.get(`/api/user/profile/${ctxUserId}`).then(parseProfile)
    }, []);

    //esto y lo anterior deberia ir idealmente en un hook
    const parseProfile = (res) => setProfile(res.data)

    if (!profile) {
        return <div>loading...</div>
    }

    return (
        <div className="d-flex align-items-center justify-content-center bg-black text-light min-vh-100">
            <div className='d-flex align-items-start w-75 min-vh-100'>
                <div className="col-md-1 mt-3">
                    {profile.name}
                </div>
                <div className="col-md-3 mt-3">
                    <ProfileBar />
                </div>
                <div className="h-card col-md-7 mt-3">
                    <ProfileTopBar />
                    <PostView />
                </div>
            </div>
        </div>
    )
}
export default Profile;

//