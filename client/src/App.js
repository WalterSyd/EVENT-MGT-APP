// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EventDetails from './pages/EventDetails';
import CreateEventPage from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import EventList from './pages/EventList';
import RegisteredEvents from './pages/RegisteredEvents';
import Profile from './pages/Profile';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import OurServices from './components/OurServices';

// Style for the main content area to account for the fixed navbar and sidebar
const mainContentStyle = {
  marginLeft: '250px', // Leaves space for the sidebar
  marginTop: '60px',  // Leaves space for the navbar
  padding: '20px',
  backgroundColor: '#f4f4f4',
  minHeight: '100vh'
};

function App() {
  return (
    <Router>
      {/* Fixed Navbar and Sidebar */}
      <Navbar />
      <Sidebar />

      {/* Main content area for routes */}
      <div style={mainContentStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/create-event" element={<CreateEventPage />} />
          <Route path="/my-events" element={<RegisteredEvents />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;