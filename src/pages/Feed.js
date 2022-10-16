import React from 'react'
import PostView from '../components/PostView';
import PostEditor from '../components/PostEditor';
const Home = () => {


    return (
        <div className="container-fluid">
            <div className="row min-vh-100">
                <div className="col-12 bg-black border-end border-secondary">
                    <PostEditor />
                </div>
                <div className="col bg-black  border-secondary"></div>
            </div>
        </div>
    );
}

export default Home;