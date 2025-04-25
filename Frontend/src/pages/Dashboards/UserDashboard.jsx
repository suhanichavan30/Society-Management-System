import { useState, useEffect, React } from 'react';
import { FaPeopleGroup } from "react-icons/fa6";
import { MdHomeWork } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { BiMessageAltError } from "react-icons/bi";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
    const [user, setUser] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/user-login");
        }
    }, []);
    

    useEffect(() => {
       
    }, [user]);

    const handleclick=(e)=>{
        e.preventDefault();
        sessionStorage.removeItem("user");
        navigate('/')
    }

    return (
        <div className='w-full h-scrren bg-gray-100'>
            <div >
                <div className='flex justify-between px-5 py-3 bg-gray-200 border  border-gray-400'>
                    <h2 className='font-semibold text-xl'>Online Society Management System</h2>
                    <div className='flex justify-end gap-4 pr-3'>
                        <NavLink to="/homepage" className='bg-blue-600 px-3 py-2 text-white rounded-md'>Home</NavLink>
                        <button onClick={handleclick} className='bg-blue-600 px-3 py-2 text-white rounded-md'>Logout</button>
                    </div>
                </div>
            </div>
            <div className='w-full pl-72 px-5 py-3 bg-gray-200 '>
                <h1 className='text-black text-2xl '>Hey {user.username}!</h1>
            </div>
            <div className=' w-full flex'>
                <div className='w-[20vw] bg-gray-200 h-screen'>
                    <div className='mt-4 '>
                        <h1 className='text-xl font-semibold py-2 px-4 mt-4 mb-2'>Dashboard</h1>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>User Info</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Pay Maintainence</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Notice</h2>
                        <h2 className='text-md font-semibold py-2 px-4 mb-2'>Complaints</h2>

                    </div>
                </div>


                <div className='text-white flex font-semibold  w-[80vw] h-[60vh] mt-10 ml-14 flex-wrap gap-4 '>

                    <div   className='h-[26vh] w-[20vw] text-left text-xl px-6 py-2 rounded-md bg-blue-500 '>
                        <div className='h-1/2 w-full'><MdHomeWork size={80} /></div>
                        <NavLink state={{ user }}  to="/user-info" className="underline">Your Info</NavLink>
                    </div>

                    <div className='h-[26vh] w-[20vw] text-left text-xl px-6 py-2 rounded-md bg-blue-500 '>
                        <div className='h-1/2 w-full'><FaMoneyCheckAlt size={80} /></div>
                        <NavLink state={{ user }}  to='/maintenance' className="underline">Pay Maintainence</NavLink>
                    </div>

                    <div className='h-[26vh] w-[20vw] text-left px-6 py-2 text-xl rounded-md bg-red-500'>
                        <div className='h-1/2 w-full'><BiMessageAltError size={80} /></div>
                        <NavLink state={{ user }}  className="underline" to="/complaint">Add Complaint</NavLink>
                    </div>
                    <div className='h-[26vh] w-[20vw]  text-left px-6 py-2 text-xl rounded-md bg-green-600'>
                        <div className='h-1/2 w-full'><LuNotebookPen size={80} /></div>
                        <NavLink className="underline" to="/noticelist">Notice List</NavLink>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default UserDashboard