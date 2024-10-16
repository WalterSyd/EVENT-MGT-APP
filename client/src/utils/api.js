import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5555',  // Adjust as needed
});

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
        try {
            const response = await api.post('/refresh', { token: refreshToken });
            localStorage.setItem('access_token', response.data.access_token);
        } catch (error) {
            console.error('Token refresh failed', error);
            // Handle token refresh failure (e.g., redirect to login)
        }
    }
};