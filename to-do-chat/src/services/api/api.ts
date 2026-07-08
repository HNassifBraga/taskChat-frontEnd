import axios from 'axios';

export const apiBaseURL = 'https://taskchat-backend-4.onrender.com';

export const api = axios.create({
  baseURL: apiBaseURL,
  timeout: 30000,
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json',
  },
});