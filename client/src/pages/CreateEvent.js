import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/events', {
        title,
        description,
        date,
        time,
        location,
      });
      console.log(response.data);
      alert('Event failed to create successfully!');
      // Reset form fields
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setLocation('');
    } catch (error) {
      console.error(error);
      alert('Event created Successfully ');
    }
  };

  const containerStyle = {
    backgroundColor: '#ecf0f1',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif'
  };

  const headingStyle = {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const labelStyle = {
    color: '#2c3e50',
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #bdc3c7',
    fontSize: '16px',
  };

  const textareaStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #bdc3c7',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '100px',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    borderRadius: '5px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    marginTop: '15px',
  };

  const buttonHoverStyle = {
    backgroundColor: '#1abc9c',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Create Event</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Description:</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={textareaStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = '#1abc9c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;