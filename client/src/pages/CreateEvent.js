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
      const response = await axios.post('http://127.0.0.1:5000/events', {
        title,
        description,
        date,
        time,
        location,
      });
      console.log(response.data);
      alert('Event created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <br />
        <label>
          Date:
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <br />
        <label>
          Time:
          <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;