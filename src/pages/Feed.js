import React from 'react'
import PostView from '../components/PostView';
const Home = () => {


  return (
    <div className="d-flex align-items-center justify-content-center bg-black text-light min-vh-100">
    <div className='d-flex align-items-start w-75 min-vh-100'>
        <div className="col-md-2 mt-2">
        </div>
        <div className="col-md-8 mt-8">
            <PostView/>
            <PostView/>
            <PostView/>
            <PostView/>
            <PostView/>
            <PostView/>
            <PostView/>
        </div>
        <div className="col-md-2 mt-2">
        </div>
    </div>
</div>
  );
}

export default Home;