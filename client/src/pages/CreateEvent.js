import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const CreateEventSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    location: Yup.string().required('Location is required'),
});

function CreateEvent() {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.post('/events', values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            alert('Event created successfully');
        } catch (error) {
            console.error('Error creating event', error);
            alert('Failed to create event');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ title: '', description: '', date: '', time: '', location: '' }}
            validationSchema={CreateEventSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="title" placeholder="Event Title" />
                    <ErrorMessage name="title" component="div" />
                    <Field type="text" name="description" placeholder="Description" />
                    <ErrorMessage name="description" component="div" />
                    <Field type="date" name="date" />
                    <ErrorMessage name="date" component="div" />
                    <Field type="time" name="time" />
                    <ErrorMessage name="time" component="div" />
                    <Field type="text" name="location" placeholder="Location" />
                    <ErrorMessage name="location" component="div" />
                    <button type="submit" disabled={isSubmitting}>Create Event</button>
                </Form>
            )}
        </Formik>
    );
}

export default CreateEvent;