import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditEventSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    location: Yup.string().required('Location is required'),
});

function EditEvent() {
    const { id } = useParams();
    const [event, setEvent] = React.useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await axios.get(`/events/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            setEvent(response.data);
        };
        fetchEvent();
    }, [id]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axios.put(`/events/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            alert('Event updated successfully');
        } catch (error) {
            console.error('Error updating event', error);
            alert('Failed to update event');
        } finally {
            setSubmitting(false);
        }
    };

    if (!event) return <div>Loading...</div>;

    return (
        <Formik
            initialValues={{ 
                title: event.title, 
                description: event.description, 
                date: event.date, 
                time: event.time, 
                location: event.location 
            }}
            validationSchema={EditEventSchema}
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
                    <button type="submit" disabled={isSubmitting}>Update Event</button>
                </Form>
            )}
        </Formik>
    );
}

export default EditEvent;