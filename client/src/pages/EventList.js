
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://event-mgt-app-t1wa.onrender.com/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);
console.log(events)
    const handleRegister = async (eventId) => {
        try {
            const response = await axios.post(`https://event-mgt-app-t1wa.onrender.com/events/${eventId}/register`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error registering for event:', error);
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <p>{event.description}</p>
                        <button onClick={() => handleRegister(event.id)}>Register</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventList;