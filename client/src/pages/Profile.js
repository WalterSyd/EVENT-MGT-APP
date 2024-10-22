import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  return (
    <div>
      <h2>Profile</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <br />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      )}
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <label>
          Current Password:
          <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
        </label>
        <br />
        <label>
          New Password:
          <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Confirm New Password:
          <input type="password" value={confirmNewPassword} onChange={(event) => setConfirmNewPassword(event.target.value)} />
        </label>
        <br />
        <button type="submit">Change Password</button>
      </form>
      <h2>Delete Account</h2>
      <form onSubmit={handleDeleteAccount}>
        <p>Are you sure you want to delete your account?</p>
        <button type="submit">Delete Account</button>
      </form>
      {deleteAccount && (
        <p>Your account has been deleted.</p>
      )}
    </div>
  );
};

export default Profile;
