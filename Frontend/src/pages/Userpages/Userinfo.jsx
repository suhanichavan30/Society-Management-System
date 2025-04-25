import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { FaUser, FaBuilding, FaPhone, FaEnvelope } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { BiKey } from "react-icons/bi";
import { MdAddCall } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdBallot } from "react-icons/md";
const Userinfo = () => {
    const location = useLocation();
    const user = location.state?.user; 
  return (
    <div className="w-full h-screen">
      <div className='w-full mt-5 pl-32'>
      <NavLink to="/user-dashboard"><IoArrowBackSharp size={20} /></NavLink>
      </div>
        <h2 className="text-2xl font-semibold text-gray-800  text-center m-5 mb-4">Profile</h2>
        <div className="w-full px-20 text-center ">
          <div className=" bg-gray-200 p-5  rounded-lg m-4">
          <h1 className='text-xl font-semibold  text-gray-800 mb-3'>Personal Information</h1>
          
          <div className="flex items-center space-x-3 mb-3">
            <FaUser className="text-green-600 text-xl" />
            <h1 className='text-xl font-medium'>Username : </h1>
            <p className="text-lg font-medium">{user.username}</p>
          </div>
          <div className="flex items-center space-x-3 mb-3">
            <FaEnvelope className="text-green-600 text-xl" />
            <h1 className='text-xl font-medium'>Email Address : </h1>
            <p className="text-lg font-medium">{user.email}</p>
          </div>
          <div className="flex items-center space-x-3">
            <MdAddCall className="text-green-600 text-xl" />
            <h1 className='text-xl font-medium'>Phone Number : </h1>
            <p className="text-lg font-medium">{user.phone}</p>
          </div>
          
          </div>
          <div>
          <hr className="border-t border-gray-300 my-3" />
          <div className="bg-gray-200 p-5 m-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Room Details</h3>
            <div className="flex items-center space-x-3 mb-3">
              <FaBuilding className="text-green-600 text-xl" />
              <h1 className='text-xl font-medium'>Building : </h1>
              <p className="text-lg font-medium">{user.wing}</p>
            </div>
            <div className="flex items-center space-x-3 mb-3">
            <MdBallot className="text-green-600 text-xl" />
            <h1 className='text-xl font-medium'>Floor No :  </h1>
              <p className="text-lg font-medium">{user.floorno}</p>
            </div>
            <div className="flex items-center space-x-3 mb-3">
            <BiKey className="text-green-600 text-xl" />
            <h1 className='text-xl font-medium'>Room Number : </h1>
              <p className="text-lg font-medium">{user.room}</p>
            </div>
            <div className="flex items-center space-x-3">
            <IoHome className="text-green-600 text-xl" />
            <h1 className='text-xl font-medium'>Flat Type:  </h1>
              <p className="text-lg font-medium">{user.flattype}</p>
            </div>
          </div>
          </div>
      </div>
        
    </div>
  );
}

export default Userinfo