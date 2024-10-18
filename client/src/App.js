import './App.css'; // Make sure the path is correct
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import EventList from './pages/EventList'; // Import the Event List
import RegisteredEvents from './pages/RegisteredEvents'; // Import RegisteredEvents
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import OurServices from './components/OurServices';

function App() {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <div className="main-content"> {/* Added wrapper for main content */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/events" element={<EventList />} />
                    <Route path="/registered-events" element={<RegisteredEvents />} />
                    <Route path="/event/:id" element={<EventDetails />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/edit-event/:id" element={<EditEvent />} />
                    
                    {/* New Routes for About Us, Our Services, and Contact Us */}
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/services" element={<OurServices />} />
                    <Route path="/contact" element={<ContactUs />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
