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
