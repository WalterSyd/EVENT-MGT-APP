import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegisteredEvents() {
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                // Simulate registered events data (Replace this with real API call when available)
                const eventsData = [
                    { id: 1, title: 'Africa Bitcoin Conference 2024', description: 'Explore Bitcoin and crypto developments in Africa.' },
                    { id: 2, title: 'Silicon Xchange 2024', description: 'Tech event featuring top industry leaders.' }
                ];
                setRegisteredEvents(eventsData); // Set fetched data
            } catch (error) {
                console.error('Error fetching registered events:', error);
            }
        };
        fetchRegisteredEvents();
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/events');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>My Registered Events</h1>
            <ul>
                {registeredEvents.map(event => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RegisteredEvents;
