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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9' }}>
      <h1 style={{ fontSize: '2em', color: '#004b8d', marginBottom: '10px' }}>Contact Us</h1>
      <p style={{ marginBottom: '20px', color: '#333' }}>
        At Event Mastarz, we’re excited to help you bring your vision to life! Whether you have questions about our services, need assistance planning your event, or want to explore how we can tailor our offerings to meet your specific needs, we’re here to assist you.
      </p>

      <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>Get in Touch</h2>
      <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px', color: '#333' }}>
        <li><strong>Phone:</strong> (+254) 738234831</li>
        <li><strong>Email:</strong> event_mastarz@plan.com</li>
        <li><strong>Address:</strong> Ngong Lane</li>
        <li><strong>Website:</strong> <a href="http://localhost:3000/sample" style={{ color: '#004b8d' }}>http://localhost:3000/sample</a></li>
      </ul>

      <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>Business Hours</h2>
      <p style={{ marginBottom: '20px', color: '#333' }}>
        <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM<br />
        <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br />
        <strong>Sunday:</strong> Closed
      </p>

      <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>Contact Form</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', marginBottom: '10px', border: '1px solid #004b8d', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', marginBottom: '10px', border: '1px solid #004b8d', borderRadius: '5px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{ padding: '8px', width: '100%', height: '100px', marginBottom: '10px', border: '1px solid #004b8d', borderRadius: '5px' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: '#004b8d',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Send Message
        </button>
        {successMessage && (
          <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>
        )}
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
        )}
      </form>

      <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>Follow Us</h2>
      <p style={{ marginBottom: '20px', color: '#333' }}>
        Stay connected and inspired! Follow us on social media for the latest updates, event tips, and behind-the-scenes insights:
      </p>
      <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '20px', color: '#333' }}>
        <li><strong>Facebook:</strong> <a href="https://www.facebook.com/EventMastarz" style={{ color: '#004b8d' }}>https://www.facebook.com/EventMastarz</a></li>
        <li><strong>Instagram:</strong> <a href="https://www.instagram.com/EventMastarz" style={{ color: '#004b8d' }}>https://www.instagram.com/EventMastarz</a></li>
        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/company/EventMastarz" style={{ color: '#004b8d' }}>https://www.linkedin.com/company/EventMastarz</a></li>
      </ul>

      <h2 style={{ fontSize: '1.5em', color: '#007bff', marginBottom: '10px' }}>Why Choose Us?</h2>
      <p style={{ marginBottom: '20px', color: '#333' }}>
        Choosing the right event management partner can make all the difference. At Event Mastarz, we bring years of expertise, creativity, and a commitment to excellence to every event. We pride ourselves on our personalized approach and attention to detail, ensuring that your event is not just successful but truly memorable.
      </p>

      <p style={{ marginBottom: '20px', color: '#333' }}>
        Thank you for considering Event Mastarz for your event management needs. We look forward to connecting with you soon!
      </p>
    </div>
  );
};

export default ContactUs;
