import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:4001/auth',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
