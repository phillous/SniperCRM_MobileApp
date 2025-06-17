import axios from 'axios';

const BASE_URL = 'https://e4b6-197-211-59-91.ngrok-free.app/api/v1';

const api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
