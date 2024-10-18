import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const RegisterSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Role is required'),
});

function Register() {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.post('/register', values);
            alert('Registration successful');
        } catch (error) {
            console.error('Registration error', error);
            alert('Registration failed');
        } finally {
            setSubmitting(false);
        }
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

    const buttonHoverStyle = {
        backgroundColor: '#1abc9c',
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>Register</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', role: 'user' }} // Default role
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form style={formStyle}>
                        <div>
                            <Field type="text" name="username" placeholder="Username" style={inputStyle} />
                            <ErrorMessage name="username" component="div" style={{ color: 'red', fontSize: '14px' }} />
                        </div>
                        <div>
                            <Field type="email" name="email" placeholder="Email" style={inputStyle} />
                            <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '14px' }} />
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="Password" style={inputStyle} />
                            <ErrorMessage name="password" component="div" style={{ color: 'red', fontSize: '14px' }} />
                        </div>
                        <div>
                            <Field as="select" name="role" style={inputStyle}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Field>
                            <ErrorMessage name="role" component="div" style={{ color: 'red', fontSize: '14px' }} />
                        </div>
                        <button
                            type="submit"
                            style={buttonStyle}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1abc9c'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}
                            disabled={isSubmitting}
                        >
                            Register
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Register;
