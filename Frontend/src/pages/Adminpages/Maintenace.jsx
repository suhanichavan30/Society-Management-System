import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Maintenace = () => {
  const [paidUsers, setPaidUsers] = useState([]);
  const [unpaidUsers, setUnpaidUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const paidRes = await axios.get("http://localhost:3000/api/paid-users");
        const unpaidRes = await axios.get("http://localhost:3000/api/unpaid-users");

        if (paidRes.data.success) {
          setPaidUsers(paidRes.data.users);
        }

        if (unpaidRes.data.success) {
          setUnpaidUsers(unpaidRes.data.users);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-full h-screen">
    <div className="mt-10 mb-5 pl-56">
            <NavLink to="/admin-dashboard" className="text-md underline flex items-center gap-2">
              <IoIosArrowBack />
              Back To Dashboard
            </NavLink>
          </div>
    <div className="p-6 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-center">🧾 Maintenance Payment Report</h2>

      {/* Paid Users Table */}
      <h3 className="text-lg font-semibold mb-2 text-green-700">✅ Paid Users</h3>
      <table className="w-full mb-8 border shadow-md rounded-md overflow-hidden">
        <thead className="bg-green-200">
          <tr>
            <th className="p-3 border">Username</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Wing</th>
            <th className="p-3 border">Flat Type</th>
            <th className="p-3 border">Room No</th>
            <th className="p-3 border">Amount Paid (₹)</th>
          </tr>
        </thead>
        <tbody>
          {paidUsers.length > 0 ? (
            paidUsers.map((user) => (
              <tr key={user._id} className="text-center hover:bg-green-50">
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.wing}</td>
                <td className="p-2 border">{user.flattype}</td>
                <td className="p-2 border">{user.room}</td>
                <td className="p-2 border">{user.roomfee}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No paid users found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Unpaid Users Table */}
      <h3 className="text-lg font-semibold mb-2 text-red-700">❌ Unpaid Users</h3>
      <table className="w-full border shadow-md rounded-md overflow-hidden">
        <thead className="bg-red-200">
          <tr>
            <th className="p-3 border">Username</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Wing</th>
            <th className="p-3 border">Flat Type</th>
            <th className="p-3 border">Room No.</th>

          </tr>
        </thead>
        <tbody>
          {unpaidUsers.length > 0 ? (
            unpaidUsers.map((user) => (
              <tr key={user._id} className="text-center hover:bg-red-50">
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.wing}</td>
                <td className="p-2 border">{user.flattype}</td>
                <td className="p-2 border">{user.room}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">No unpaid users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Maintenace;
