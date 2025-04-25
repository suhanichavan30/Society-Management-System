import { React, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios'
const Guestview = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")

    const navigate=useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/api/guest", { name, email });
            setname("");
            setemail("");
            alert("Guest data submitted successfully!");
            navigate("/homepage")
        } catch (error) {
            console.error("Error submitting guest data:", error);
            alert("Failed to submit data.");
        }
    };
    return (
        <div className='w-full h-screen'>
            <div className=' mt-4 mb-2 pl-56'>
                <NavLink to="/" className="text-md underline flex items-center gap-2">
                    <IoIosArrowBack />
                    Back
                </NavLink>
            </div>
            <div className='h-[80vh] flex justify-center items-center'>
                <div className=' w-[30vw] relative flex-wrap border border-gray-500 rounded'>
                    <form className='px-5 text-center' onSubmit={handlesubmit}>
                        <h1 className='w-full text-center mt-10 text-2xl font-semibold p-2'>Guest View</h1>
                        <h3 className='mt-4 mb-1 text-left text-lg font-medium'> Name</h3>
                        <input value={name} required onChange={(e) => setname(e.target.value)} className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ' type="text" placeholder='your name' />
                        <h3 className='mt-3 mb-1 text-left text-lg font-medium'> Email</h3>
                        <input value={email} required onChange={(e) => setemail(e.target.value)} className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ' type="email" placeholder='abc@example.com' />
                        <button type='submit' className='m-10 rounded-md py-2  font-semibold px-4 bg-blue-600 text-xl text-white hover:bg-blue-700'>Visit as Guest</button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Guestview