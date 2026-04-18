import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';
const api = axios.create({
  baseURL: isLocalhost 
    ? 'http://localhost:5000' 
    : (import.meta.env.VITE_API_URL || 'https://resume-craft-0j6o.onrender.com'),
});

// Automatically add token to headers if it exists in local storage
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
