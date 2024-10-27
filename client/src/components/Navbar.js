import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for routing

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategory, setSearchCategory] = useState('all');
  const [access_token, setAccessToken] = useState(localStorage.getItem('access_token') || '');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/events/search`, {
        params: {
          term: searchTerm,
          category: searchCategory,
        },
      });
      setSearchResults(response.data);
      console.log('Search Results:', response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAccessToken('');
    window.location.href = '/login';
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    position: 'fixed',
    top: '0',
    left: '250px', // Accounts for the sidebar width
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
    <div>
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
          <select 
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', width: '150px' }}
          >
            <option value="all">All categories</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="art">Art</option>
            <option value="food">Food</option>
          </select>
          <button style={buttonStyle} onClick={handleSearch}>Search</button>
        </div>

        {/* Navbar Links */}
        <div>
          <Link to="/about" style={buttonStyle}>About Us</Link>
          <Link to="/services" style={buttonStyle}>Our Services</Link>
          <Link to="/contact" style={buttonStyle}>Contact Us</Link>
          {access_token ? (
            <button style={buttonStyle} onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login" style={buttonStyle}>Login</Link>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div style={{ padding: '20px' }}>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <Link to={`/events/${result.id}`}>{result.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;