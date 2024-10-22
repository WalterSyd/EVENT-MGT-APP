import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventRegistration = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(1); // Replace with actual logged-in user ID
  const [message, setMessage] = useState('');
  const accessToken = localStorage.getItem('access_token'); // Adjust as needed to retrieve the token

  useEffect(() => {
    // Fetch events from your API
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events'); // Adjust API endpoint as necessary
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const registerForEvent = async (eventId) => {
    try {
      const response = await axios.post('/api/register', {
        user_id: userId,
        event: eventId,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Add the token here
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred during registration.");
      }
    }
  };

  return (
    <div>
      <h1>Events</h1>
      {message && <p>{message}</p>}
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <button onClick={() => registerForEvent(event.id)}>
              Register
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventRegistration;
