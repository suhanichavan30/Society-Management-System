// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { IoIosArrowBack } from "react-icons/io";

// const Userlogin = () => {
//   return (
//     <div className='w-full h-screen'>
//       <div className=' mt-4 mb-2 pl-56'>
//         <NavLink to="/" className="text-md underline flex items-center gap-2">
//           <IoIosArrowBack />
//           Back
//         </NavLink>
//       </div>
//       <div className=' h-[80vh] flex justify-center items-center'>
//         <div className='border border-gray-500 rounded   w-[30vw] flex-wrap'>
//           <form className='px-5 text-center' action="">
//             <h1 className='w-full text-center mt-10 text-2xl font-semibold p-2'>User Login</h1>
//             <h3 className='mt-4 mb-1 text-left text-lg font-medium'> Email</h3>
//             <input className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ' type="email" placeholder='abc@example.com' />
//             <h3 className='mt-3 mb-1 text-left text-lg font-medium'> Password</h3>
//             <input className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ' type="password" placeholder='enter password' />
//             <button className='m-6 rounded-md py-2  font-semibold px-4 bg-blue-500 text-xl text-white '>Login</button>
//           </form>
//           <h2 className='px-5 mb-5'>Don't have an account?<NavLink to='/user-register' className={'text-blue-600'}>Register Here</NavLink></h2>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Userlogin







import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
const Userlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/users/login', { email, password }, { 
        withCredentials: true  
      });
      const user = response.data?.data?.user; 
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user)); 
        navigate('/user-dashboard'); 
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  
  };

  return (
    <div className='w-full h-screen'>
      <div className='mt-4 mb-2 pl-56'>
        <NavLink to="/" className="text-md underline flex items-center gap-2">
          <IoIosArrowBack />
          Back
        </NavLink>
      </div>
      <div className='h-[80vh] flex justify-center items-center'>
        <div className='border border-gray-500 rounded w-[30vw] p-5'>
          <form onSubmit={handleLogin} className='text-center'>
            <h1 className='text-2xl font-semibold p-2'>User Login</h1>

            {error && <p className="text-red-500">{error}</p>}

            <h3 className='mt-4 mb-1 text-left text-lg font-medium'>Email</h3>
            <input 
              type="email"
              className='w-full text-md p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-300'
              placeholder='abc@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h3 className='mt-3 mb-1 text-left text-lg font-medium'>Password</h3>
            <input
              type="password"
              className='w-full text-md p-2 border border-gray-400 rounded focus:ring-2 focus:ring-blue-400'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className='m-6 rounded-md py-2 px-4 bg-blue-500 text-xl text-white font-semibold'>
              Login
            </button>
          </form>

          <h2 className='mb-5'>Don't have an account? 
            <NavLink to='/user-register' className='text-blue-600'> Register Here</NavLink>
          </h2>

        
        </div>
      </div>
    </div>
  );
};

export default Userlogin;
