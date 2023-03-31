import axios from 'axios';

// axios instance
export const apiCall = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

