import axios from 'axios';

const BASE_URL = 'https://90d5-197-211-59-124.ngrok-free.app/api/v1';

const api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
