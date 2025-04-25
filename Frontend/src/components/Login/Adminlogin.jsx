import {React,useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Adminlogin = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate=useNavigate();

    const handlelogin=async(e)=>{
        e.preventDefault();
        const adminemail1=import.meta.env.VITE_API_EMAIL1 ;
        const adminpass=import.meta.env.VITE_API_PASS1;
        const adminemail2=import.meta.env.VITE_API_EMAIL2;
        if ((email === adminemail1|| adminemail2) && password === adminpass) {
            sessionStorage.setItem('isAdmin', 'true');
            navigate('/admin-dashboard'); // Redirect to Admin Dashboard
        } else {
            setError('Invalid email or password!');
        }
    }
    return (
        <div className='w-full h-screen'>
            <div className=' mt-4 mb-2 pl-56'>
                <NavLink to="/" className="text-md underline flex items-center gap-2">
                    <IoIosArrowBack />
                    Back To Dashboard
                </NavLink>
            </div>
            <div className=' h-[80vh] flex justify-center items-center '>
                <div className='border border-gray-500 rounded   w-[30vw] flex-wrap'>
                    <form className='px-5 text-center' onSubmit={handlelogin}>
                        <h1 className='w-full text-center mt-10  text-2xl font-semibold p-2'>Admin Login</h1>
                        <h3 className='mt-4 text-left text-lg font-medium mb-1'> Email</h3>
                        <input value={email} onChange={(e)=>setemail(e.target.value)} className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ' type="email" placeholder='abc@example.com' />
                        <h3 className='mt-3 text-left text-lg font-medium mb-1'> Password</h3>
                        <input value={password} onChange={(e)=>setpassword(e.target.value)} className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ' type="password" placeholder='enter password' />
                        <button className='m-6 rounded-md py-2 font-semibold px-4 bg-blue-500 text-xl  '>Login</button>
                    </form>

                </div>
            </div>
        </div>


    )
}

export default Adminlogin