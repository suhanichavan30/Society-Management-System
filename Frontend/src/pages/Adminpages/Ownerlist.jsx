import React, { useState ,useEffect} from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const Ownerlist = () => {
    const [owner, setowner] = useState([]);
    

    useEffect(() => {
        fetchOwner();
    }, [])
    
    const fetchOwner = async () => {
        try {
          const response = await axios.get("http://localhost:3000/users/allowner");
          setowner(response.data);
        } catch (error) {
          console.error("Error fetching notices:", error);
         
        }
      };

  return (
    <div className="w-full min-h-screen flex flex-col items-center  p-10">
            <div className="w-full">
                <NavLink to="/admin-dashboard" className="text-md underline flex items-center gap-2">
                
                    Back To Dashboard
                </NavLink>
            </div>
            <h1 className="text-2xl font-semibold mb-6">Owners List</h1>

            <div className="w-[60vw] text-center mb-4 py-2 font-bold text-xl bg-emerald-300">
                <h1> Total Owners={owner.length}</h1>
            </div>

            { (
                <table className="w-[80vw] border-collapse border border-gray-400">
                    <thead>
                        <tr className="bg-emerald-300">
                            <th className="border border-gray-400 p-2">Name</th>
                            <th className="border border-gray-400 p-2">Email</th>
                            <th className="border border-gray-400 p-2">Phone</th>
                            <th className="border border-gray-400 p-2">Wing</th>
                            <th className="border border-gray-400 p-2">Floor No</th>
                            <th className="border border-gray-400 p-2">Room No</th>
                            <th className="border border-gray-400 p-2">Flat Type</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {owner.length > 0 ? (
                            owner.map((owner, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border border-gray-400 p-2">{owner.username}</td>
                                    <td className="border border-gray-400 p-2">{owner.email}</td>
                                    <td className="border border-gray-400 p-2">{owner.phone}</td>
                                    <td className="border border-gray-400 p-2">{owner.wing}</td>
                                    <td className="border border-gray-400 p-2">{owner.floorno}</td>
                                   <td className="border border-gray-400 p-2">{owner.room}</td>
                                   <td className="border border-gray-400 p-2">{owner.flattype}</td>
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
  )
}

export default Ownerlist