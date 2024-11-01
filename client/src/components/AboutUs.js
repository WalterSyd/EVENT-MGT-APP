import React from 'react';

const AboutUs = () => {
    return (
        <div style={{ 
            padding: '20px', 
            background: 'linear-gradient(to bottom right, #e0f7fa, #ffffff)', 
            color: '#333', 
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh'
        }}>
            <h1 style={{ color: '#0d6efd', fontSize: '2.5rem', marginBottom: '10px' }}>About Us</h1>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Welcome to Event Mastarz, your premier event management partner dedicated to crafting unforgettable experiences. Founded on a passion for bringing people together, we have transformed the event planning landscape by seamlessly blending creativity with meticulous execution.
            </p>
            
            <h2 style={{ color: '#198754', fontSize: '2rem', marginBottom: '10px' }}>Our Vision</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                At Event Mastarz, we believe that every event tells a story. Whether it's a corporate gala, a wedding, or a community celebration, our goal is to create moments that resonate long after the event is over. We strive to push the boundaries of traditional event planning, continuously innovating to exceed our clients’ expectations.
            </p>
            
            <h2 style={{ color: '#198754', fontSize: '2rem', marginBottom: '10px' }}>What We Do</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Our comprehensive services cover every aspect of event management, including:
            </p>
            
            <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
                <li style={{ marginBottom: '10px', fontSize: '1.1rem' }}><strong>Concept Development:</strong> We collaborate with you to shape your ideas into a cohesive vision.</li>
                <li style={{ marginBottom: '10px', fontSize: '1.1rem' }}><strong>Logistics Management:</strong> From venue selection to vendor coordination, we handle all the logistics to ensure a smooth event.</li>
                <li style={{ marginBottom: '10px', fontSize: '1.1rem' }}><strong>Design & Décor:</strong> Our creative team curates stunning visuals that align with your theme and brand.</li>
                <li style={{ marginBottom: '10px', fontSize: '1.1rem' }}><strong>On-Site Coordination:</strong> Our experienced staff ensures everything runs flawlessly on the day of your event.</li>
                <li style={{ marginBottom: '10px', fontSize: '1.1rem' }}><strong>Post-Event Analysis:</strong> We provide insights and feedback to help you measure the success of your event.</li>
            </ul>
            
            <h2 style={{ color: '#198754', fontSize: '2rem', marginBottom: '10px' }}>Why Choose Us?</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                Our success is built on strong relationships and a commitment to excellence. We take the time to understand your needs, ensuring a personalized approach that reflects your values and objectives. Our extensive network of trusted vendors and industry partners enables us to secure the best resources for your event, all while staying within budget.
            </p>
            
            <h2 style={{ color: '#198754', fontSize: '2rem', marginBottom: '10px' }}>Our Promise</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
                At Event Mastarz, we take pride in our integrity, creativity, and attention to detail. We are dedicated to making your event not just a function, but an experience that leaves a lasting impression.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                Join us in making your next event a remarkable celebration that your guests will remember for years to come! Let’s create magic together.
            </p>
        </div>
    );
};

export default AboutUs;
