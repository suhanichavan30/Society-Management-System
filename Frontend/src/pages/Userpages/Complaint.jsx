import {React,useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const Complaint = () => {
  const location = useLocation();
  const user = location.state?.user;
  const owner=user.username;
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [complaints, setcomplaints] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/addcomplaint", { title, description,owner })
      alert("data submitted succesfully");
      settitle("");
      setdescription("");
    } catch (err) {
      alert("failed to send Complaint")
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/allComplaint");
      setcomplaints(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        await axios.delete(`http://localhost:3000/api/deletecomplaint/${id}`);
        alert("Complaint deleted successfully!");
        fetchComplaints();
      } catch (error) {
        console.error("Error deleting notice:", error);
        alert("Failed to delete notice.");
      }
    }
  };
  return (
    <div className='w-full h-screen'>
        <div className='  mt-10 mb-5 pl-10'>
        <NavLink to="/user-dashboard" className="text-md underline flex items-center gap-2">
  <IoIosArrowBack />
  Back To Dashboard
</NavLink>
        </div>
    <div className='flex justify-center items-center '>
        
       <div className='  border border-gray-500 rounded ml-4 h-[80vh] w-1/2 flex-wrap p-8'>
        <h1 className='text-2xl font-semibold'>Add Complaint</h1>
            <form onSubmit={handleSubmit}>
            <h2 className='mt-4 mb-1 text-left text-lg font-medium'>Complaint Title</h2>
            <input value={title} onChange={(e)=>settitle(e.target.value)} className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ' type="text" placeholder='Enter notice title' required />
            <h2 className='mt-4 mb-1 text-left text-lg font-medium'>Description</h2>
            <textarea value={description} onChange={(e)=>setdescription(e.target.value)} className='w-full text-md p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ' placeholder='Describe the notice' rows={5} cols={5} required></textarea>
            <div className='flex justify-center gap-5 mt-6'>
            <button className=' rounded-md py-2 text-white font-semibold px-4  bg-blue-600 text-md '>Add Complaint</button>
            <NavLink to="/user-dashboard" className=' rounded-md py-2 font-semibold text-white px-4 bg-blue-600 text-md '>Cancel</NavLink>
            </div>
            </form>
        </div>

        <div className='  border border-gray-500 rounded ml-4 h-[80vh] w-1/2 flex-wrap p-8'>
        <h1 className='text-2xl font-semibold'>All Complaints</h1>
            {complaints.length === 0 ? (
                        <p className='text-black'>No Complaints available.</p>
                      ) : (
                        <div className='max-h-[300px]  overflow-y-auto'>
                            <ul className='space-y-4'>
                          {complaints.map((complaint) => (
                            <li key={complaint._id} className='p-4 mt-5 border-black border shadow rounded-lg flex justify-between items-center'>
                              <div >
                                <h3 className='text-lg font-bold text-blue-700'>{complaint.title}</h3>
                                <p className='text-gray-600'>{complaint.description}</p>
                                
                              </div>
                              <button onClick={() => handleDelete(complaint._id)} className='text-red-600 hover:text-red-800'>
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

export default Complaint