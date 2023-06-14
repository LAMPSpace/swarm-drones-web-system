import Axios from 'axios';
import { decode } from 'base-64';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000',
    headers: {
        'Accept': 'application/json',
    },
    withCredentials: false,
})

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token') || '';

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})
export default axios;
