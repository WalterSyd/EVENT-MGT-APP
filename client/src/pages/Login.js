import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});


function Login() {
    const navigate = useNavigate(); // Initialize the navigate function
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');


    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('https://event-mgt-app-t1wa.onrender.com/api/login', values);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('username', response.data.username); // Save username to localStorage
            localStorage.setItem('user_id', response.data.user_id);
            alert('Login successful');
            setIsLoggedIn(true);
            setUsername(response.data.username);
            navigate('/'); // Redirect to home after login
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed');
        } finally {
            setSubmitting(false);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        navigate('/login');
    };


    // Styling
    const containerStyle = {
        backgroundColor: '#ecf0f1',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '50px auto',
        fontFamily: 'Arial, sans-serif'
    };


    const headingStyle = {
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: '20px',
    };


    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    };


    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #bdc3c7',
        fontSize: '16px',
    };


    const buttonStyle = {
        padding: '12px',
        backgroundColor: '#2c3e50',
        color: 'white',
        borderRadius: '5px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        marginTop: '15px',
    };



    return (
        <div style={containerStyle}>
            {isLoggedIn ? (
                <div>
                    <h2 style={headingStyle}>Welcome, {username}!</h2>
                    <button style={buttonStyle} onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h2 style={headingStyle}>Login</h2>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form style={formStyle}>
                                <div>
                                    <Field type="email" name="email" placeholder="Email" style={inputStyle} />
                                    <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '14px' }} />
                                </div>
                                <div>
                                    <Field type="password" name="password" placeholder="Password" style={inputStyle} />
                                    <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '14px' }} />
                                </div>
                                <button
                                    type="submit"
                                    style={buttonStyle}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#1abc9c'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}
                                    disabled={isSubmitting}
                                >
                                    Login
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </div>
    );
}


export default Login;