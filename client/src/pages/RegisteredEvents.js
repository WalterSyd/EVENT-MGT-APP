import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegisteredEvents() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/registered-events');
        setRegisteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching registered events:', error);
      }
    };
    fetchRegisteredEvents();
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvents((prevSelectedEvents) => [...prevSelectedEvents, event]);
  };

  const handleDeselectEvent = (event) => {
    setSelectedEvents((prevSelectedEvents) =>
      prevSelectedEvents.filter((selectedEvent) => selectedEvent.id !== event.id)
    );
  };

  const handleSaveEvents = async () => {
    try {
      const event_ids = selectedEvents.map((event) => event.id);
      await axios.post('http://127.0.0.1:5000/api/registered-events', { event_ids });
      console.log('Events saved successfully');
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  return (
    <div>
      <h1>My Registered Events</h1>
      <ul>
        {registeredEvents.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
      <h1>Available Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <label>
              <input
                type="checkbox"
                checked={selectedEvents.some((selectedEvent) => selectedEvent.id === event.id)}
                onChange={() => (event.id === selectedEvents[0].id ? handleDeselectEvent(event) : handleSelectEvent(event))}
              />
              Save event
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSaveEvents}>Save Selected Events</button>
    </div>
  );
}

export default RegisteredEvents;