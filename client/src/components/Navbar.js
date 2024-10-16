import React from 'react';

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-content">
                <input type="text" placeholder="Search events..." className="search-bar" />
                <button className="btn">Login</button>
                <button className="btn">Register</button>
                <button className="btn">Logout</button>
            </div>
        </div>
    );
}

export default Navbar;