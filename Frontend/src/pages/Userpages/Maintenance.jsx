import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const Maintenance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user || {}); // Store user data
  const [paymentStatus, setPaymentStatus] = useState("Not Paid");
  const [roomFee, setRoomFee] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = user?.username || localStorage.getItem("username");
      if (!username) {
        console.error("❌ Username is missing");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/payment-status/${username}`);
        const { status, roomfee } = response.data;
        setPaymentStatus(status);
        setRoomFee(roomfee);
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call function when component mounts
  }, []); // Re-run if username changes

  const handlePayment = () => {
    navigate("/payment", { state: { roomfee: roomFee, userName: user.username } });
  };

  return (
    <div className="w-full h-screen  bg-gray-100">
      <div className="pt-10 pl-14 ">
        <NavLink to="/user-dashboard" className="flex items-center text-blue-600 text-md font-semibold underline">
          <IoIosArrowBack className="mr-1" />
          Back To Dashboard
        </NavLink>
      </div>

      <div className="bg-white ml-96  shadow-xl rounded-lg p-8 w-[40vw] text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Yearly Maintenance Fee</h2>
        
        <div className="border-t border-gray-300 pt-4">
          <p className="text-lg font-medium text-gray-700">Flat Type:</p>
          <p className="text-xl font-semibold text-blue-600">{user?.flattype || "N/A"}</p>
        </div>
        
        <div className="border-t border-gray-300 pt-4 mt-4">
          <p className="text-lg font-medium text-gray-700">Yearly Fee:</p>
          <p className="text-xl font-semibold text-green-600">₹{roomFee || "0"}</p>
        </div>

        <div className="border-t border-gray-300 pt-4 mt-4">
          <p className="text-lg font-medium text-gray-700">Payment Status:</p>
          <p className={`text-xl font-semibold ${paymentStatus === "Paid" ? "text-green-600" : "text-red-600"}`}>
            {paymentStatus}
          </p>
        </div>

        {paymentStatus !== "Paid" && (
          <button
            onClick={handlePayment}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default Maintenance;
