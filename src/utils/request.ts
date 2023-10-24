import axios from 'axios';

const request = axios.create({
  // baseURL: 'http://localhost:4001',
  baseURL: 'https://chat-app-backend-js.onrender.com',
  headers: {
    'Content-type': 'application/json',
  },
});

export default request;
