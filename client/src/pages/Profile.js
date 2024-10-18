import React from 'react';

function Profile() {
    const username = localStorage.getItem('username'); // Retrieve username from localStorage

    return (
        <div className="profile">
            <h1>Profile Information</h1>
            <p>Username: {username ? username : 'Guest'}</p>
        </div>
    );
}

export default Profile;
