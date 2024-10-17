
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegisteredEvents() {
    const [registeredEvents, setRegisteredEvents] = useState([]);

    useEffect(() => {
        const fetchRegisteredEvents = async () => {
            try {
                const response = await axios.get('/registered-events', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setRegisteredEvents(response.data);
            } catch (error) {
                console.error('Error fetching registered events:', error);
            }
        };
        fetchRegisteredEvents();
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