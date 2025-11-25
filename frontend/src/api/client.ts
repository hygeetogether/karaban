import axios from 'axios';

const client = axios.create({
    baseURL: '/api', // Vite proxy will handle this
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
