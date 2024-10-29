import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [deleteAccount, setDeleteAccount] = useState(false);

  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setName(user.name);
    setEmail(user.email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.patch('/api/profile', {
      name,
      email,
    })
      .then(response => {
        setUser(response.data);
        setEditing(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const passwordSchema = Joi.object({
    newPassword: Joi.string().required().min(8).max(128),
    confirmNewPassword: Joi.string().required().min(8).max(128),
  });

  const validatePassword = (data) => {
    const { error } = passwordSchema.validate(data);
    if (error) {
      return { error: error.details[0].message };
    }
    return { error: null };
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    const { error } = validatePassword({ newPassword, confirmNewPassword });
    if (error) {
      return console.error(error);
    }
    axios.patch('/api/profile/change-password', {
      currentPassword,
      newPassword,
      confirmNewPassword,
    })
      .then(response => {
        console.log(response.data);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleDeleteAccount = (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) {
      return;
    }
    axios.delete('/api/profile')
      .then(response => {
        console.log(response.data);
        setDeleteAccount(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Styling with gradient background
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #003366, #008080)', // Gradient background
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const contentBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slight transparency for contrast
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '90%',
    maxWidth: '500px',
    margin: '10px',
  };

  const headerStyle = {
    color: '#003366',
    fontSize: '24px',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const formStyle = {
    margin: '10px 0',
  };

  const inputStyle = {
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    maxWidth: '300px',
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#008080',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ccc',
    marginLeft: '10px',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff4d4d',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={contentBoxStyle}>
        <h2 style={headerStyle}>Profile</h2>
        {editing ? (
          <form onSubmit={handleSubmit} style={formStyle}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                style={inputStyle}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={inputStyle}
              />
            </label>
            <br />
            <button type="submit" style={buttonStyle}>Save Changes</button>
            <button type="button" onClick={handleCancel} style={cancelButtonStyle}>Cancel</button>
          </form>
        ) : (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleEdit} style={buttonStyle}>Edit Profile</button>
          </div>
        )}
        <h2 style={headerStyle}>Change Password</h2>
        <form onSubmit={handleChangePassword} style={formStyle}>
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              style={inputStyle}
            />
          </label>
          <br />
          <label>
            New Password:
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              style={inputStyle}
            />
          </label>
          <br />
          <label>
            Confirm New Password:
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
              style={inputStyle}
            />
          </label>
          <br />
          <button type="submit" style={buttonStyle}>Change Password</button>
        </form>
        <h2 style={headerStyle}>Delete Account</h2>
        <form onSubmit={handleDeleteAccount} style={formStyle}>
          <p>Are you sure you want to delete your account?</p>
          <button type="submit" style={deleteButtonStyle}>Delete Account</button>
        </form>
        {deleteAccount && (
          <p>Your account has been deleted.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
