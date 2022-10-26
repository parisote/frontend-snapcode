import { Button } from 'react-bootstrap';
import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/Auth-context';
import ProfileForm from './ProfileForm';
import apiClient from '../services/apiClient';

function ProfileBar(data) {
  const ctx = useContext(AuthContext)
  const [following, setFollowing] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleFollow = async () => {
    try {
      await apiClient.post(`/api/user/follow/${ctx.userId}/${data.userId}`)
      setFollowing(() => !following)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    if (ctx.userId !== data.userId) {
      apiClient.get(`/api/user/followers/${data.userId}`).then(parseFollowers)
    }
  }, []);
  const parseFollowers = (res) => {
    const isFollowing = res.data.find(e => e.followingId === ctx.userId)
    if (isFollowing) setFollowing(() => true)
  }

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-black min-vh-100">
      <div className="d-flex text-white ">
        <img className='rounded-circle me-2' src={`https://vsa-bucket-test.s3.sa-east-1.amazonaws.com/${data.pfp}`} alt='alt' style={{ width: '90%', border: '2px solid #404040' }} ></img>
      </div>
      <div className='fs-2 text-white mt-3'>
        {data.name}
      </div>
      <div className='fs-4 text-secondary fw-light'>
        @{data.username}
      </div>
      <div className='fs-5 text-white mt-3'>
        {data.biography}
      </div>
      <div className='d-flex flex-order-1 flex-md-order-none mt-4'>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people text-secondary" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
        <p className='fs-6 mx-1'>{data.followers.length}</p>
        <p className='fs-6 text-secondary'>followers</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dot text-secondary" viewBox="0 0 16 16">
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
        <p className='fs-6 mx-1'>{data.followings.length}</p>
        <p className='fs-6 text-secondary'>following</p>
      </div>
      <div className='d-flex flex-order-1 flex-md-order-none mt-2 '>
        <ul className='list-unstyled'>
          <li className='d-flex flex-order-1 flex-md-order-none '>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo-alt text-secondary" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
            <p className='fs-6 mx-1 fw-light'>{data.location}</p>
          </li>
          <li className='d-flex flex-order-1 flex-md-order-none'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-hammer text-secondary" viewBox="0 0 17 14">
              <path d="M9.972 2.508a.5.5 0 0 0-.16-.556l-.178-.129a5.009 5.009 0 0 0-2.076-.783C6.215.862 4.504 1.229 2.84 3.133H1.786a.5.5 0 0 0-.354.147L.146 4.567a.5.5 0 0 0 0 .706l2.571 2.579a.5.5 0 0 0 .708 0l1.286-1.29a.5.5 0 0 0 .146-.353V5.57l8.387 8.873A.5.5 0 0 0 14 14.5l1.5-1.5a.5.5 0 0 0 .017-.689l-9.129-8.63c.747-.456 1.772-.839 3.112-.839a.5.5 0 0 0 .472-.334z" />
            </svg>
            <p className='fs-6 mx-1 fw-light'>{data.workingAt}</p>
          </li>
          <li className='d-flex flex-order-1 flex-md-order-none'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope text-secondary" viewBox="0 0 18 12">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            <p className='fs-6 mx-1 fw-light'>{data.email}</p>
          </li>
          <li className='d-flex flex-order-1 flex-md-order-none'>
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" className="bi bi-linkedin text-secondary" viewBox="0 0 16 13">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
            </svg>
            <p className='fs-6 mx-1 fw-light'>{data.linkedIn}</p>
          </li>
          <li className='d-flex flex-order-1 flex-md-order-none'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter text-secondary" viewBox="0 0 16 14">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
            </svg>
            <p className='fs-6 mx-1 fw-light'>{data.twitter}</p>
          </li>
        </ul>
      </div>
      <ProfileForm show={show} handleClose={handleClose} data={data} />
      {(data.userId === ctx.userId) ?
        <Button variant="outline-secondary" className='w-75 mx-3' onClick={handleShow}>
          Edit Profile
        </Button>
        :
        (!following) ?
          <Button variant="outline-secondary" className='w-75 mx-3' onClick={handleFollow}>
            Follow
          </Button>
          :
          <Button variant="outline-danger" className='w-75 mx-3' onClick={handleFollow}>
            Unfollow
          </Button>
      }
    </div>
  );
}
export default ProfileBar;