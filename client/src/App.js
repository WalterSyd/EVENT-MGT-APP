
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

function App() {
    return (
        <Router>
            <Navbar />
            <Sidebar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events" element={<EventList />} /> 
                <Route path="/registered-events" element={<RegisteredEvents />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/edit-event/:id" element={<EditEvent />} />
            </Routes>
        </Router>
    );
}

export default App;