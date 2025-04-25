import { React, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const Notice = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [venue, setvenue] = useState("");
  const [notices, setnotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/allnotices");
      setnotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        await axios.delete(`http://localhost:3000/api/deletenotice/${id}`);
        alert("Notice deleted successfully!");
        fetchNotices();
      } catch (error) {
        console.error("Error deleting notice:", error);
        alert("Failed to delete notice.");
      }
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/addnotice", { title, desc, venue })
      alert("data submitted succesfully")
      settitle("");
      setdesc("");
      setvenue("");

    } catch (error) {
      console.error("Error submitting guest data:", error);
      alert("Failed to submit data.");
    }

  }
  return (
    <div className='w-full h-screen'>
      <div className='mt-4 mb-2 '>
        <NavLink to="/admin-dashboard" className="text-md underline flex items-center gap-2">
          <IoIosArrowBack />
          Back
        </NavLink>
      </div>
      <h1 className='text-2xl font-semibold mb-1 pl-10'>Add New Notice</h1>
      <div className='w-full px-10'>
        <div className='border border-gray-500 rounded w-full p-8'>
          <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              <div className='w-1/2'>
                <h2 className='text-left text-lg font-medium'>Notice Title</h2>
                <input className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300'
                  type="text" placeholder='Enter notice title' value={title} required onChange={(e) => settitle(e.target.value)} />

                <h2 className='text-left text-lg font-medium'>Venue</h2>
                <input className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300'
                  type="text" placeholder='Enter venue' value={venue} onChange={(e) => setvenue(e.target.value)} />
              </div>

              <div className='w-1/2'>
                <h2 className='text-left text-lg font-medium'>Description</h2>
                <textarea value={desc} onChange={(e) => setdesc(e.target.value)}
                  className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300'
                  placeholder='Describe the notice' rows={4} required>
                </textarea>
              </div>
            </div>

            <div className='flex justify-center gap-5'>
              <button className='rounded-md py-2 text-white font-semibold px-4 bg-blue-600 text-md'>Add Notice</button>
              <NavLink to="/admin-dashboard" className='rounded-md py-2 font-semibold text-white px-4 bg-gray-500 text-md'>Cancel</NavLink>
            </div>
          </form>
        </div>
        <div className='bg-white shadow-md rounded-lg p-6 mt-6'>
          <h2 className='text-2xl font-semibold mb-4'>All Notices</h2>
          {notices.length === 0 ? (
            <p className='text-gray-600'>No notices available.</p>
          ) : (
            <div className='max-h-[300px] overflow-y-auto'>
                <ul className='space-y-4'>
              {notices.map((notice) => (
                <li key={notice._id} className='p-4 bg-gray-100 shadow rounded-lg flex justify-between items-center'>
                  <div>
                    <h3 className='text-lg font-bold text-blue-700'>{notice.title}</h3>
                    <p className='text-gray-600'>{notice.desc}</p>
                    <p className='text-sm text-gray-500'>Venue: {notice.venue}</p>
                  </div>
                  <button onClick={() => handleDelete(notice._id)} className='text-red-600 hover:text-red-800'>
                    <FaTrashAlt className='text-xl' />
                  </button>
                </li>
              ))}
            </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notice