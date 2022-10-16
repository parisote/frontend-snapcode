import React from 'react'
import ProfileBar from '../components/ProfileBar';
import PostView from '../components/PostView';
import ProfileTopBar from '../components/ProfileTopBar';

const Profile = () => {
    return (
        <div className="d-flex align-items-center justify-content-center bg-black text-light min-vh-100">
            <div className='d-flex align-items-start w-75 min-vh-100'>
                <div className="col-md-1 mt-3"></div>
                <div className="col-md-3 mt-3">
                    <ProfileBar />
                </div>
                <div className="h-card col-md-7 mt-3">
                    <ProfileTopBar />
                    {/* <PostView /> */}
                </div>
            </div>
        </div>
    )
}
export default Profile;

//