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
            await axios.post('/api/register', values);
            alert('Registration successful');
        } catch (error) {
            console.error('Registration error', error);
            alert('Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', role: 'user' }} // Default role
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="username" placeholder="Username" />
                    <ErrorMessage name="username" component="div" />
                    <Field type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />
                    <Field type="password" name="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" />
                    <Field as="select" name="role">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </Field>
                    <ErrorMessage name="role" component="div" />
                    <button type="submit" disabled={isSubmitting}>Register</button>
                </Form>
            )}
        </Formik>
    );
}

export default Register;