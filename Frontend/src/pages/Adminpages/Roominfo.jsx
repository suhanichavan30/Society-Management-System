import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Roominfo = () => {
  const [purchasedRooms, setPurchasedRooms] = useState([]); 
  const [loading, setLoading] = useState(true);

  const buildings = [
    { name: "Building A", rooms: Array.from({ length: 10 }, (_, i) => ({ roomNumber: i + 101, flatType: "1BHK" })) },
    { name: "Building B", rooms: Array.from({ length: 10 }, (_, i) => ({ roomNumber: i + 201, flatType: "2BHK" })) },
    { name: "Building C", rooms: Array.from({ length: 10 }, (_, i) => ({ roomNumber: i + 301, flatType: "3BHK" })) },
    { name: "Building D", rooms: Array.from({ length: 10 }, (_, i) => ({ roomNumber: i + 401, flatType: "2BHK" })) }
  ];

  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users/allowner");
      const ownerData = response.data; 
      setPurchasedRooms(ownerData); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching room data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-bold">Loading Rooms...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className="w-full">
                <NavLink to="/admin-dashboard" className="text-md underline flex items-center gap-2">
                
                    Back To Dashboard
                </NavLink>
            </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Society Information</h1>
      {buildings.map((building, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{building.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {building.rooms.map((room, idx) => {
              const isPurchased = purchasedRooms.some(owner => owner.room === room.roomNumber); // Check if room is purchased
              return (
                <div
                  key={idx}
                  className={`p-3 border w-[20vw] rounded-md ${
                    isPurchased ? "bg-red-400 text-white" : "bg-green-400 text-white"
                  }`}
                >
                  <p className="font-semibold text-lg">Room {room.roomNumber}</p>
                  <p>Type: {room.flatType}</p>
                  <p>Status: {isPurchased ? "Purchased" : "Empty"}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roominfo;
