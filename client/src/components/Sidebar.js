// import React from 'react';

// function Sidebar() {
//     return (
//         <div className="sidebar">
//             <ul>
//                 <li><a href="/">Home</a></li>
//                 <li><a href="/create-event">Create Event</a></li>
//                 <li><a href="/my-events">My Events</a></li>
//                 <li><a href="/profile">Profile</a></li>
//             </ul>
//         </div>
//     );
// }

// export default Sidebar;

import React, { useState } from 'react';
import axios from 'axios';

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

  // Navbar Styles
  const navbarStyle = {
    height: '60px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    marginLeft: '0px', // Leaves space for the sidebar
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    zIndex: '1001',
    position: 'fixed',
    top: '0',
    width: 'calc(100% - 250px)', // Ensures it doesn't overlap the sidebar
  };

  const navbarContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    justifyContent: 'flex-end', // Aligns content to the right
    width: '100%'
  };

  const searchBarStyle = {
    padding: '8px',
    borderRadius: '20px',
    border: '1px solid #ccc',
    outline: 'none',
    width: '200px'
  };

  const buttonStyle = {
    backgroundColor: '#d55b69',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    margin: '0 10px'
  };

  const handleButtonHover = (e, isHovering) => {
    e.target.style.backgroundColor = isHovering ? '#b45a76' : '#d55b69';
  };

  return (
    <div style={navbarStyle}>
      <div style={navbarContentStyle}>
        <input
          type="text"
          placeholder="Search events..."
          style={searchBarStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          About Us
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          Contact Us
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          Services
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
