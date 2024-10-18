// ContactUs.js
import React, { useState } from 'react';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', { name, email, message });
    };

    return (
        <div className="contact-us">
            <h1>Contact Us</h1>
            <p>
                At [Company Name], we’re excited to help you bring your vision to life! Whether you have questions about our services, need assistance planning your event, or want to explore how we can tailor our offerings to meet your specific needs, we’re here to assist you.
            </p>

            <h2>Get in Touch</h2>
            <ul>
                <li><strong>Phone:</strong> [Your Phone Number]</li>
                <li><strong>Email:</strong> [Your Email Address]</li>
                <li><strong>Address:</strong> [Your Physical Address]</li>
                <li><strong>Website:</strong> [Your Website URL]</li>
            </ul>

            <h2>Business Hours</h2>
            <p>
                <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM<br />
                <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br />
                <strong>Sunday:</strong> Closed
            </p>

            <h2>Contact Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>

            <h2>Follow Us</h2>
            <p>
                Stay connected and inspired! Follow us on social media for the latest updates, event tips, and behind-the-scenes insights:
            </p>
            <ul>
                <li><strong>Facebook:</strong> [Your Facebook Link]</li>
                <li><strong>Instagram:</strong> [Your Instagram Link]</li>
                <li><strong>LinkedIn:</strong> [Your LinkedIn Link]</li>
            </ul>

            <h2>Why Choose Us?</h2>
            <p>
                Choosing the right event management partner can make all the difference. At [Company Name], we bring years of expertise, creativity, and a commitment to excellence to every event. We pride ourselves on our personalized approach and attention to detail, ensuring that your event is not just successful but truly memorable.
            </p>

            <p>Thank you for considering [Company Name] for your event management needs. We look forward to connecting with you soon!</p>
        </div>
    );
};

export default ContactUs;
