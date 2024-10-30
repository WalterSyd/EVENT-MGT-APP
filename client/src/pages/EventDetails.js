import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EventDetails() {
  const [event, setEvent] = useState({});

  const eventId = useParams().id; // Get the event ID from the URL parameter

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`https://event-mgt-app-t1wa.onrender.com/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [eventId]);

  return (
    <div>
      <h1>Event Details</h1>
      {event && (
        <div>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Location: {event.location}</p>
        </div>
      )}
    </div>
  );
}

export default EventDetails;