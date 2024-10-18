import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Sidebar = () => {
  // Sidebar Styles
  const sidebarStyle = {
    height: '100vh',
    width: '210px',
    backgroundColor: '#2c3e50',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '1000',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)'
  };

  const linkListStyle = {
    listStyleType: 'none',
    padding: 0,
    marginTop: '20px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '15px 0',
    borderBottom: '1px solid #555',
    display: 'block',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const logoStyle = {
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: '20px',
    borderBottom: '1px solid white',
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo */}
      <div style={logoStyle}>
        Dashboard
      </div>

      {/* Sidebar Links */}
      <ul style={linkListStyle}>
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/create-event" style={linkStyle}>
            Create Event
          </Link>
        </li>
        <li>
          <Link to="/my-events" style={linkStyle}>
            My Events
          </Link>
        </li>
        <li>
          <Link to="/profile" style={linkStyle}>
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/events?search=${searchTerm}`);
      console.log('Search Results:', response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  // Navbar Styles (you can adjust them further)
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    top: '0',
    left: '210px', // Accounts for the sidebar width
    right: '0',
    zIndex: '1001',
  };

  const buttonStyle = {
    backgroundColor: '#1abc9c',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    margin: '0 10px'
  };

  return (
    <div style={navbarStyle}>
      {/* Search Bar */}
      <div>
        <input 
          type="text" 
          placeholder="Search events..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', width: '300px' }}
        />
        <button style={buttonStyle} onClick={handleSearch}>Search</button>
      </div>

      {/* Navbar Links */}
      <div>
        <Link to="/about" style={buttonStyle}>About Us</Link>
        <Link to="/services" style={buttonStyle}>Our Services</Link>
        <Link to="/contact" style={buttonStyle}>Contact Us</Link>
        <button style={buttonStyle}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
