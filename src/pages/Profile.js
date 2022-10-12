import React from 'react'
import ProfileBar from '../components/ProfileBar';
import PostView from '../components/PostView';

const Profile = () =>
{
    return (
        <div class="gutter d-flex flex-md-row flex-column bg-black text-light">
            <div class="h-card col-md-3">
               <ProfileBar/>
            </div>
            <div class="h-card col-md-9">
                <PostView/>
            </div>
        </div>
    )
}
export default Profile;