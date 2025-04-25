import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Complaintlist = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/allcomplaint");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="mt-10 mb-5 pl-56">
        <NavLink to="/admin-dashboard" className="text-md underline flex items-center gap-2">
          <IoIosArrowBack />
          Back To Dashboard
        </NavLink>
      </div>
      <div className="text-center w-full">
      <h1 className="text-2xl font-semibold mb-4">Complaints List</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[80vw] pt-4">       
          {loading ? (
            <p>Loading complaints...</p>
          ) : complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <ul className="space-y-4">
              {complaints.map((complaint) => (
                <li key={complaint._id} className="p-4 bg-red-100 border border-black rounded">
                  <div className="">
                  <h2 className="text-2xl font-semibold mb-2">{complaint.title}</h2>
                  <p className="text-xl font-medium text-gray-700 mb-2">{complaint.description}</p>
                 <div className="flex justify-between">
                 <p className="text-md text-gray-500">
                  📅 : {new Date(complaint.createdAt).toLocaleString()}
                  </p>
                  <p>Owner : {complaint.owner}</p>
                 </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaintlist;
