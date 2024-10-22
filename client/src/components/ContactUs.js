// ContactUs.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contact', {
        name,
        email,
        message,
      });
      if (response.status === 200) {
        setSuccessMessage('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMessage('Error sending message. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error sending message. Please try again.');
    }
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>
        At [Company Name], we’re excited to help you bring your vision to life! Whether you have questions about our services, need assistance planning your event, or want to explore how we can tailor our offerings to meet your specific needs, we’re here to assist you.
      </p>

      <h2>Get in Touch</h2>
      <ul>
        <li><strong>Phone:</strong> (+254) 738234831</li>
        <li><strong>Email:</strong> event_mastarz@plan.com</li>
        <li><strong>Address:</strong> Ngong Lane</li>
        <li><strong>Website:</strong> http://localhost:3000/sample</li>
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
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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
        Choosing the right event management partner can make all the difference. At Event Mastarz, we bring years of expertise, creativity, and a commitment to excellence to every event. We pride ourselves on our personalized approach and attention to detail, ensuring that your event is not just successful but truly memorable.
      </p>

      <p>Thank you for considering Event Mastarz for your event management needs. We look forward to connecting with you soon!</p>
    </div>
  );
};

export default ContactUs;