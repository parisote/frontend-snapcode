import React, { useContext } from 'react'
import AuthContext from '../context/Auth-context';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'


function ProfileBar(props) {
  const ctx = useContext(AuthContext)

  const followUser = (event) => {
    alert("followUser")
    return
  }

  //Ocultar boton POST cuando es modo vista
  //Editor no habilitado cuando es modo vista

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-black  min-vh-100">
      <div className="d-flex text-white ">
        <img className='rounded-circle me-2' src='https://cdn.wallpapersafari.com/71/8/mFdy4l.jpg' style={{ width: '90%', border: '2px solid #404040' }} ></img>
      </div>
      <div className='fs-2 text-white mt-3'>
        {/* Full name */}
        Juan Martin
      </div>
      <div className='fs-4 text-secondary fw-light'>
        {/* User handle */}
        harushishi
      </div>
      <div className='fs-5 text-white mt-3'>
        {/* Biography */}
        Backend Dev student
      </div>
      <div className='d-flex flex-order-1 flex-md-order-none mt-2'>
        {/* Followers / Following */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people text-secondary" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
        <p className='fs-6 mx-1'>500</p>
        <p className='fs-6 text-secondary'>followers</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dot text-secondary" viewBox="0 0 16 16">
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
        <p className='fs-6 mx-1'>15</p>
        <p className='fs-6 text-secondary'>following</p>
      </div>
    </div>
  );
}
export default ProfileBar;