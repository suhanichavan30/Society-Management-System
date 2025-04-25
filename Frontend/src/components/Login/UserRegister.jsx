import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    wing: '',
    room: '',
    flattype: '',
    floorno: '',
    roomfee: 0,
    status: 'pending'
  });
  const [error, setError] = useState(null);
  
  const validateForm = () => {
    const { wing, room, flattype } = formData;
    const roomNumber = parseInt(room, 10);
    const conditions = {
      A: { min: 101, max: 110, type: "1bhk" },
      B: { min: 201, max: 210, type: "2bhk" },
      C: { min: 301, max: 310, type: "3bhk" },
      D: { min: 401, max: 410, type: "2bhk" }
    };
    if (!conditions[wing]) {
      return "Invalid wing selection. Choose A, B, C, or D.";
    }
    const { min, max, type } = conditions[wing];
    if (roomNumber < min || roomNumber > max) {
      return `Invalid room number for wing ${wing}. It should be between ${min} and ${max}.`;
    }
    if (flattype.toLowerCase() !== type) {
      return `Invalid flat type for wing ${wing}. It should be ${type.toUpperCase()}.`;
    }
    return null;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };
    
    if (name === "flattype") {
      const type = value.toLowerCase();
      let fee = 0;
      if (type === "1bhk") fee = 5000;
      else if (type === "2bhk") fee = 7000;
      else if (type === "3bhk") fee = 8000;
      updatedData.roomfee = fee;
    }
    
    setFormData(updatedData);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/users/register', formData);
      alert("User registered successfully");
      navigate('/user-login');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
        <div className='border border-gray-500 rounded flex-wrap'>
          <form className='px-5 text-center' onSubmit={handleSubmit}>
            <div className='flex w-[60vw]'>
              <div className='w-1/2 m-5'>
                <h3 className='mt-3 text-left text-lg font-medium'>Name</h3>
                <input className='w-full p-2 border rounded' type="text" name="username" value={formData.username} onChange={handleChange} placeholder='Enter your name' required />
                <h3 className='mt-3 text-left text-lg font-medium'>Phone No</h3>
                <input className='w-full p-2 border rounded' maxLength={10} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder='Enter your mobile no' required />
                <h3 className='mt-3 text-left text-lg font-medium'>Email</h3>
                <input className='w-full p-2 border rounded' type="email" name="email" value={formData.email} onChange={handleChange} placeholder='abc@example.com' required />
                <h3 className='mt-3 text-left text-lg font-medium'>Password</h3>
                <input className='w-full p-2 border rounded' type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter password' required />
              </div>
              <div className='w-1/2 m-5'>
                <h3 className='mt-3 text-left text-lg font-medium'>Floor No</h3>
                <input className='w-full p-2 border rounded' type="text" name="floorno" value={formData.floorno} onChange={handleChange} placeholder='floor no' required />
                <h3 className='mt-3 text-left text-lg font-medium'>Wing</h3>
                <input className='w-full p-2 border rounded' type="text" name="wing" value={formData.wing} onChange={handleChange} placeholder='A' required />
                <h3 className='mt-3 text-left text-lg font-medium'>Room No</h3>
                <input className='w-full p-2 border rounded' type="text" name="room" value={formData.room} onChange={handleChange} placeholder='1001' required />
                <h3 className='mt-3 text-left text-lg font-medium'>Flat Type</h3>
                <input className='w-full p-2 border rounded' type="text" name="flattype" value={formData.flattype} onChange={handleChange} placeholder='Enter flat type' required />
                <h3  className='mt-3 hidden text-left text-lg font-medium'>Room Fee</h3>
                <input className='w-full hidden p-2 border rounded bg-gray-200' type="text" name="roomfee" value={formData.roomfee}  />
              </div>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
            <button className='m-6 rounded py-1 font-semibold px-4 bg-blue-500 text-xl text-white' type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserRegister;