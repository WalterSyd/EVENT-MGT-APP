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
      <h1 className="contact-us-title">Contact Us</h1>
      <p className="contact-us-description">
        At Event Mastarz, we’re excited to help you bring your vision to life! Whether you have questions about our services, need assistance planning your event, or want to explore how we can tailor our offerings to meet your specific needs, we’re here to assist you.
      </p>

      <h2 className="contact-us-subtitle">Get in Touch</h2>
      <ul className="contact-us-list">
        <li className="contact-us-list-item">
          <strong>Phone:</strong> (+254) 738234831
        </li>
        <li className="contact-us-list-item">
          <strong>Email:</strong> event_mastarz@plan.com
        </li>
        <li className="contact-us-list-item">
          <strong>Address:</strong> Ngong Lane
        </li>
        <li className="contact-us-list-item">
          <strong>Website:</strong> http://localhost:3000/sample
        </li>
      </ul>

      <h2 className="contact-us-subtitle">Business Hours</h2>
      <p className="contact-us-business-hours">
        <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM<br />
        <strong>Saturday:</strong> 10:00 AM - 4:00 PM<br />
        <strong>Sunday:</strong> Closed
      </p>

      <h2 className="contact-us-subtitle">Contact Form</h2>
      <form onSubmit={handleSubmit} className="contact-us-form">
        <div className="contact-us-form-group">
          <label className="contact-us-form-label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="contact-us-form-input"
          />
        </div>
        <div className="contact-us-form-group">
          <label className="contact-us-form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="contact-us-form-input"
          />
        </div>
        <div className="contact-us-form-group">
          <label className="contact-us-form-label">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="contact-us-form-textarea"
          />
        </div>
        <button type="submit" className="contact-us-form-button">
          Send Message
        </button>
        {successMessage && (
          <p className="contact-us-success-message">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="contact-us-error-message">{errorMessage}</p>
        )}
      </form>

      <h2 className="contact-us-subtitle">Follow Us</h2>
      <p className="contact-us-follow-us">
        Stay connected and inspired! Follow us on social media for the latest updates, event tips, and behind-the-scenes insights:
      </p>
      <ul className="contact-us-social-media-list">
        <li className="contact-us-social-media-item">
          <strong>Facebook:</strong> https://www.facebook.com/EventMastarz
        </li>
        <li className="contact-us-social-media-item">
          <strong>Instagram:</strong> https://www.instagram.com/EventMastarz
        </li>
        <li className="contact-us-social-media-item">
          <strong>LinkedIn:</strong> https://www.linkedin.com/company/EventMastarz
        </li>
      </ul>
      <h2 className="contact-us-subtitle">Why Choose Us?</h2>
      <p className="contact-us-why-choose-us">
        Choosing the right event management partner can make all the difference. At Event Mastarz, we bring years of expertise, creativity, and a commitment to excellence to every event. We pride ourselves on our personalized approach and attention to detail, ensuring that your event is not just successful but truly memorable.
      </p>

      <p className="contact-us-thank-you">
        Thank you for considering Event Mastarz for your event management needs. We look forward to connecting with you soon!
      </p>
      </div>
      );
      };

      export default ContactUs;