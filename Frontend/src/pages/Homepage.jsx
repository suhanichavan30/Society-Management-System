import { useRef } from "react";
import { FaUserCheck, FaWrench, FaBullhorn, FaCalendarAlt, FaShieldAlt, FaUsers } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const HomePage = () => {
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
 const galleryRef = useRef(null);

  // Scroll function
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-10">
        <h1 className="text-2xl inline-block font-bold text-blue-600">SocietyConnect</h1>
        <div className="space-x-6 font-medium">
          <button onClick={() => scrollToSection(servicesRef)} className="text-gray-700 hover:text-blue-500">Services</button>
          <button onClick={() => scrollToSection(galleryRef)} className="text-gray-700 hover:text-blue-500">Gallery</button>
          <button onClick={() => scrollToSection(aboutRef)} className="text-gray-700 hover:text-blue-500">About Us</button>
          <button onClick={() => scrollToSection(contactRef)} className="text-gray-700 hover:text-blue-500">Contact</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-blue-500 text-white mt-16">
        <h2 className="text-4xl font-bold">Welcome to SocietyConnect</h2>
        <p className="text-lg mt-2">Experience a smarter way to manage your society!</p>
        <div className="mt-2"><NavLink className='bg-white text-black rounded-md text-lg font-medium px-2 py-1 m-2'  to="/">Back</NavLink></div>
      </header>

      {/* Services Section */}
      <section ref={servicesRef} className="py-12 px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <ServiceCard icon={<FaUserCheck size={40} />} title="Visitor Management" text="Ensure security by tracking visitors in real-time." />
          <ServiceCard icon={<FaWrench size={40} />} title="Maintenance Requests" text="Residents can report issues & track their resolution." />
          <ServiceCard icon={<FaBullhorn size={40} />} title="Notices & Announcements" text="Stay updated with society news & updates." />
          <ServiceCard icon={<FaCalendarAlt size={40} />} title="Event Management" text="Plan and participate in society events effortlessly." />
          <ServiceCard icon={<FaShieldAlt size={40} />} title="Security Management" text="Monitor security personnel & entry logs." />
          <ServiceCard icon={<FaUsers size={40} />} title="Community Engagement" text="Connect with neighbors & participate in discussions." />
        </div>
      </section>


<section ref={galleryRef} className="py-12 px-6 text-center bg-gray-200">
<h3 className="text-3xl font-bold text-gray-800 mb-6">Our Society Gallery</h3>
<p className="text-gray-600 mb-4">Explore the beautiful surroundings and amenities of our society.</p>
<div className="grid md:grid-cols-3 w-full gap-6">
  
  <img src="room.avif" height={30} width={400} alt="room" />
  <img src="room6.jpg"  height={10} width={400} alt="room" />
  <img src="room3.avif"  height={30} width={400} alt="room" />
  <img src="room4.jpg"  height={30} width={400} alt="room" />
  <img src="room5.jpg"  height={30} width={400} alt="room" />
  <img src="room7.webp"  height={30} width={400} alt="room" />

</div>
</section>

      {/* About Us Section */}
      <section ref={aboutRef} className="py-12 px-6 text-center bg-gray-200">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">About Us</h3>
        <p className="text-gray-600 font-medium max-w-2xl mx-auto">
        At SocietyConnect, we believe that a strong and well-managed community leads to better living. Our mission is to create a secure, efficient, and interactive environment for residents. By providing real-time updates, smart visitor management, and an easy-to-use complaint system, we empower societies to function smoothly and enhance overall living standards
        </p>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="text-center py-12 bg-blue-600 text-white">
        <h3 className="text-3xl font-bold">Contact Us</h3>
        <p className="mt-2">📍 Society Address, City - 123456</p>
        <p>📞 +91 98765 43210</p>
        <p>✉️ support@societyconnect.com</p>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 bg-gray-800 text-white">
        &copy; 2025 SocietyConnect. All rights reserved.
      </footer>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon, title, text }) => (
  <div className="p-6 bg-white shadow-md rounded-lg">
    <div className="text-blue-600">{icon}</div>
    <h4 className="text-xl font-semibold mt-4">{title}</h4>
    <p className="text-gray-600 mt-2">{text}</p>
  </div>
);

export default HomePage;


