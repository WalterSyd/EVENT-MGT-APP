// Profile.js

import React from 'react';
import axios from 'axios';

function Profile() {
  const handleEditProfile = () => {
    // Navigate to the edit profile page
    window.location.href = '/edit-profile';
  }

  const handleChangePassword = () => {
    // Open a dialog or modal to enter new password
    const newPassword = prompt('Enter new password:');
    const confirmPassword = prompt('Confirm new password:');

    if (newPassword === confirmPassword) {
      // Call the API to change password
      axios.put('http://127.0.0.1:5000/api/change-password', {
        current_password: localStorage.getItem('password'), // Assuming password is stored in local storage
        new_password: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => {
        alert('Password changed successfully!');
      })
      .catch((error) => {
        console.error('Error changing password:', error);
        alert('Failed to change password');
      });
    } else {
      alert('Passwords do not match');
    }
  }

  const handleDeleteAccount = () => {
    /* eslint-disable no-restricted-globals */
    if (confirm('Are you sure you want to delete your account?')) {
      // Call the API to delete account
      axios.delete('http://127.0.0.1:5000/api/delete-profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => {
        alert('Account deleted successfully!');
        // Remove access token and redirect to login page
        localStorage.removeItem('access_token');
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      });
    }
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <button onClick={handleEditProfile}>Edit Profile</button>
      <button onClick={handleChangePassword}>Change Password</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default Profile;