import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function Home() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
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

  const handleSelectEvent = (event) => {
    setSelectedEvents((prevSelectedEvents) => [...prevSelectedEvents, event]);
  };

  // const handleSaveEvents = async (id) => {
  //   try {
  //     await console.log(id)

  //     const event_ids = selectedEvents.map((event) => event.id);
  //     await axios.post('http://127.0.0.1:5000/api/registered-events', { event_ids });
  //     console.log('Events saved successfully');
  //   } catch (error) {
  //     console.error('Error saving events:', error);
  //   }
  // };
  const handleSaveEvents = (id) => {
    console.log(id)
    axios.post ('http://127.0.0.1:5000/api/registered-events', { event: id, user_id: localStorage.getItem('user_id') })
    console.log("Event saved successfully")
  }

  
  return (
    <div className="home-container">
      <h1>Upcoming Events</h1>
      {!isAuthenticated ? (
        <div>
          <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to access more features.</p>
        </div>
      ) : (
        <div className="events-list">
          {events.map((event, index) => (
            <div className={`event-card ${event.promoted ? 'promoted' : ''}`} key={index}>
              <h2>{event.title}</h2>
              <p>{event.time}</p>
              <p className="event-price">{event.price}</p>
              <div className="event-actions">
                {/* <button className="btn">Share this event</button> */}
                <button className="btn" onClick={()=>handleSaveEvents(event.id)}>Save Event</button> 
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;