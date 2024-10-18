import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axios.post('/login', values);
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('username', response.data.username); // Save username to localStorage
            alert('Login successful');
            navigate('/'); // Redirect to home after login
        } catch (error) {
            console.error('Login error', error);
            alert('Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" />
                    <button type="submit" disabled={isSubmitting}>Login</button>
                </Form>
            )}
        </Formik>
    );
}

export default Login;
