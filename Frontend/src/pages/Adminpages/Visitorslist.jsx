import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Visitorslist = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/allguests"); // Fetching guest data
                setVisitors(response.data);
            } catch (error) {
                console.error("Error fetching visitors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col items-center  p-10">
            <div className="w-full">
                <NavLink to="/admin-dashboard" className="text-md underline flex items-center gap-2">
                    <IoIosArrowBack />
                    Back To Dashboard
                </NavLink>
            </div>
            <h1 className="text-2xl font-semibold mb-6">Visitors List</h1>

            <div className="w-[60vw] text-center mb-4 py-2 font-bold text-xl bg-emerald-300">
                <h1> Total Visitors={visitors.length}</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-[60vw] border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-emerald-300">
                            <th className="border border-gray-400 p-2">Name</th>
                            <th className="border border-gray-400 p-2">Email</th>
                            <th className="border border-gray-400 p-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.length > 0 ? (
                            visitors.map((visitor, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-400 p-2">{visitor.name}</td>
                                    <td className="border border-gray-400 p-2">{visitor.email}</td>
                                    <td className="border border-gray-400 p-2">
                                        {new Date(visitor.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-4 text-center">No visitors yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Visitorslist;
