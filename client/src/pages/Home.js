import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function Home() {
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSaveEvents = async (eventId) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      await axios.post('http://127.0.0.1:5000/api/registered-events', {
        event_id: eventId,
        user_id: localStorage.getItem('user_id'),
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('Event saved successfully');
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      {!isAuthenticated ? (
        <div>
          <p>
            Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to access more features.
          </p>
        </div>
      ) : (
        <div className="events-list">
          {events.map((event, index) => (
            <div className={`event-card ${event.promoted ? 'promoted' : ''}`} key={index}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Time: {event.time}</p>
              <p>Location: {event.location}</p>
              <div className="event-actions">
                <button className="btn" onClick={() => handleSaveEvents(event.id)}>Save Event</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;