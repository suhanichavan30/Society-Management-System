import { useState,React } from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_API_PAYMENT);
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Userlogin from './components/Login/Userlogin';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import Adminlogin from './components/Login/Adminlogin';
import Notice from './pages/Adminpages/Notice';
import UserRegister from './components/Login/UserRegister';
import Guestview from './components/Login/Guestview';
import Homepage from './pages/Homepage';
import UserDashboard from './pages/Dashboards/UserDashboard';
import Complaint from './pages/Userpages/Complaint';
import Visitorslist from './pages/Adminpages/Visitorslist';
import Noticelist from './pages/Userpages/Noticelist';
import Ownerlist from './pages/Adminpages/Ownerlist';
import Userinfo from './pages/Userpages/Userinfo';
import Roominfo from './pages/Adminpages/Roominfo';
import Complaintlist from './pages/Adminpages/Complaintlist';
import Maintenance from './pages/Userpages/Maintenance';
import Payment from './pages/Userpages/Payment';
import Maintenace from './pages/Adminpages/Maintenace';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
       <Router>
        <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/homepage" element={<Homepage/>} />
        <Route path="/user-login" element={<Userlogin/>} />
        <Route path="/guest-view" element={<Guestview/>} />
        <Route path="/user-register" element={<UserRegister/>} />
        <Route path="/admin-login" element={<Adminlogin />} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        <Route path='/user-dashboard' element={<UserDashboard/>}/>
        <Route path='/notice' element={<Notice/>}/>
        <Route path='/complaint' element={<Complaint/>}/>
        <Route path='/noticelist' element={<Noticelist/>}/>
        <Route path='/visitors' element={<Visitorslist/>}/>
        <Route path='/maintenace' element={<Maintenace/>}/>
        <Route path="/ownerlist" element={<Ownerlist />} />
        <Route path="/room-info" element={<Roominfo />} />
        <Route path='/complaint' element={<Complaint/>}/>
        <Route path='/complaintlist' element={<Complaintlist/>}/>
        <Route path='/user-info' element={<Userinfo />}/>
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>}/>
        </Routes>
      </Router> 
      
    </>
  )
}

export default App
