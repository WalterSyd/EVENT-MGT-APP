// import React from 'react';

// function Home() {
//     return (
//         <div>
//             <h1>Upcoming Events</h1>
//             {/* Event list will be populated here */}
//         </div>
//     );
// }

// export default Home;





import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const events = [
    {
        title: 'Finding Connection After Relationship Trauma Summit',
        time: 'Today • 8:00 PM GMT+3',
        price: 'Free',
        promoted: true,
    },
    {
        title: 'Free Masterclass: Relieve Anxiety in Just 60 Seconds Using Self-Hypnosis',
        time: 'Today • 5:00 PM GMT+3',
        price: 'Free',
        promoted: true,
    },
    {
        title: 'Enchanted Full Moon Crystal Live Sale',
        time: 'Tomorrow • 2:30 AM GMT+3',
        price: 'Free',
        promoted: true,
    },
    {
        title: 'WordCamp Nairobi 2024',
        time: 'Fri, Nov 1 • 8:00 AM',
        price: 'From $14.64',
        promoted: false,
    },
    {
        title: 'Africa\'s Next Super Model 2024',
        time: 'Sat, Nov 9 • 3:00 PM',
        price: 'From $23.18',
        promoted: false,
    },
    {
        title: 'Africa Bitcoin Conference 2024',
        time: 'Mon, Dec 9 • 8:00 AM',
        price: 'From $56.00',
        promoted: false,
    },
    {
        title: 'Silicon Xchange 2024',
        time: 'Tue, Dec 10 • 9:00 AM',
        price: 'From $268.61',
        promoted: false,
    },
    {
        title: 'Nairobi International Education Fair 2024',
        time: 'Wed, Oct 30 • 10:00 AM',
        price: 'Villa Rosa Kempinski',
        promoted: true,
    },
];

function Home() {
    const isAuthenticated = localStorage.getItem('access_token');

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
                                <button className="btn">Share this event</button>
                                <button className="btn">Save this event</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
