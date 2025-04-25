import React from 'react'
import { NavLink } from 'react-router-dom';
// import { IoIosPeople } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { BiMessageAltError } from "react-icons/bi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate=useNavigate();

    const handleclick=(e)=>{
        e.preventDefault();
        sessionStorage.removeItem("isAdmin");
        navigate('/')
    }


    return (
        <div className='w-full h-scrren bg-gray-100'>
            <div >
                <div className='flex justify-between px-5 py-3 bg-gray-200 border  border-gray-400'>
                    <h2 className='font-semibold text-xl'>Online Society Management System</h2>
                    <div className='flex justify-end gap-4 pr-3'>
                        <button  className=' px-3 py-2 text-black rounded-md'>Profile</button>
                        <button onClick={handleclick} className='bg-blue-600 px-3 py-2 text-white rounded-md'>Logout</button>
                    </div>
                </div>
            </div>
            <div className=' w-full flex'>
                <div className='w-[20vw] bg-gray-200 h-screen'>
                    <div className='mt-4 '>
                        <h1 className='text-xl font-semibold py-2 px-4 mt-4 mb-2'>Admin Dashboard</h1>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Owners</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Rooms</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Visitors</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Maintainence</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Complaints</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Notice</h2>
                    </div>
                </div>
                <div className='text-white flex font-semibold  w-[80vw] h-[60vh] mt-10 ml-14 flex-wrap gap-4 '>
                <div className='h-[26vh] w-[20vw] text-left text-xl px-6 py-2 rounded-md bg-yellow-500 '>
                    <div className='h-1/2 w-full'><MdHomeWork  size={80}/></div>
                    <NavLink to='/ownerlist'>Owners List</NavLink>
                </div>
                <div className='h-[26vh] w-[20vw] text-left text-xl px-6 py-2 pt-4 rounded-md bg-blue-500 '>
                    <div className='h-1/2 w-full'><FaBuilding  size={60}/></div>
                    <NavLink to='/room-info'>Rooms Info</NavLink>
                </div>
                <div className='h-[26vh] w-[20vw] text-left text-xl px-6 py-2 rounded-md bg-pink-500 '>
                    <div className='h-1/2 w-full'><FaPeopleGroup  size={80}/></div>
                    <NavLink to="/visitors">Visitors List</NavLink>
                </div>
                <div className='h-[26vh] w-[20vw] text-left px-6 text-xl py-2 rounded-md bg-gray-500'>
                <div className='h-1/2 w-full'><FaMoneyCheckAlt  size={80}/></div>
                    <NavLink to='/maintenace'>Maintainence List</NavLink>
                </div>
                <div className='h-[26vh] w-[20vw] text-left px-6 py-2 text-xl rounded-md bg-red-500'>
                <div className='h-1/2 w-full'><BiMessageAltError  size={80}/></div>
                    <NavLink to='/complaintlist'>Complaint List</NavLink>
                </div>
                <div className='h-[26vh] w-[20vw]  text-left px-6 py-2 text-xl rounded-md bg-green-600'>
                <div className='h-1/2 w-full'><LuNotebookPen  size={80}/></div>
                    <NavLink to="/notice">Add Notice</NavLink>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard