import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get(`http://127.0.0.1:5000/api/registered-events`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const registeredEvents = response.data;
        setRegisteredEvents(registeredEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRegisteredEvents();
  }, []);

  const handleRemoveEvent = async (eventId) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.delete(`http://127.0.0.1:5000/api/registered-events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedRegisteredEvents = registeredEvents.filter((event) => event.id !== eventId);
      setRegisteredEvents(updatedRegisteredEvents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="registered-events">
      <h1>My Events</h1>
      <ul>
        {registeredEvents.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Location: {event.location}</p>
            <button onClick={() => handleRemoveEvent(event.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisteredEvents;