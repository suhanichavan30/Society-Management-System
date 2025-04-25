import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Noticelist = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/allnotices");
        const allNotices = response.data;

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split("T")[0];

        // Separate today's notices from older ones
        const todaysNotices = allNotices.filter(notice => 
          new Date(notice.createdAt).toISOString().split("T")[0] === today
        );
        const olderNotices = allNotices.filter(notice => 
          new Date(notice.createdAt).toISOString().split("T")[0] !== today
        );
        setNotices([...todaysNotices, ...olderNotices]);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="mb-4">
        <NavLink to="/user-dashboard" className="flex items-center text-blue-600 text-md font-semibold underline">
          <IoIosArrowBack className="mr-1" />
          Back To Dashboard
        </NavLink>
      </div>

      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Notice Board</h1>

      {notices.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">No notices available.</p>
      ) : (
        <div className="space-y-6">
          {notices.map((notice, index) => (
            <div key={notice._id} className={`p-6 border rounded-lg shadow-md ${index === 0 ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300'}`}>
              <h2 className="text-2xl font-semibold text-gray-900">{notice.title}</h2>
              <p className="text-gray-700 text-xl mt-2">{notice.desc}</p>
              <p className="text-md text-gray-500 mt-3">📍 Venue: <span className="font-medium">{notice.venue}</span></p>
              <p className="text-md text-gray-500 mt-1">📅 {new Date(notice.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Noticelist;
