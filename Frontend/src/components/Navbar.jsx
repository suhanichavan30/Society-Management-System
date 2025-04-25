import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='w-full bg-blue-200 px-10 py-3 flex justify-between items-center '>
                <div>
                    <h1 className='text-2xl font-bold text-blue-600'>Society Connect</h1>
                </div>
                <div className='flex justify-between text-xl font-medium items-center gap-10'>
                    <div className='border-2 border-gray-500 rounded-md px-2.5 py-2 hover:bg-blue-300'>
                        <NavLink to='/admin-login'><h3 className=''>Admin Login</h3></NavLink>
                    </div>
                    <div className='border-2 border-gray-500 rounded-md px-2.5 py-2 hover:bg-blue-300'>
                        <NavLink to='/user-login'><h3>Owner Login</h3></NavLink>
                    </div>
                </div>
            </div>
            <div className="relative">
                <img src="image1.jpg" className="w-full h-[80vh] object-cover" />
                <div className="absolute top-60 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h2 className="text-2xl font-semibold text-black mb-4">
                        Explore our platform without signing in!
                    </h2>
                    <div className="border-2 border-gray-500 text-black rounded-md px-4 py-2 bg-transparent backdrop-blur-md 
                    hover:bg-white hover:text-black transition-all duration-300 w-auto inline-block">
                        <NavLink to='/guest-view'>
                            <h3 className="text-xl font-medium">Visit as Guest</h3>
                        </NavLink>
                    </div>
                </div>

            </div>
            <div className="px-10 py-10 bg-gray-100">
                <h2 className="text-3xl font-semibold text-center">About OSMS</h2>
                <p className="mt-5 text-lg text-center max-w-4xl mx-auto">
                    OSMS (Online Society Management System) simplifies community management tasks by enabling seamless communication,
                    online payments, and resource management. Our platform is designed to empower societies and enhance member engagement.
                </p>
            </div>
        </>
    )
}

export default Navbar
