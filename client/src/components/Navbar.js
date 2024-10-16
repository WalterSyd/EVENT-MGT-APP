import React, { useState } from 'react';
import axios from 'axios';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/events?search=${searchTerm}`); // Adjust the endpoint as needed
            console.log('Search Results:', response.data);
            // Here you can update the state to show results or handle them as needed
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    className="search-bar" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button className="btn" onClick={handleSearch}>Search</button> {/* Functional Search Button */}
                <button className="btn">Login</button>
                <button className="btn">Register</button>
                <button className="btn">Logout</button>
            </div>
        </div>
    );
}

export default Navbar;