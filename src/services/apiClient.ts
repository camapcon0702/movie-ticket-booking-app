import axios from 'axios';
import { API_CONFIG } from '../constants/app.constants';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  // const token = localStorage.gettIem('accessToken');
  const token ="eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTc2NzEwODg3NiwiZXhwIjoxNzY3MTk1Mjc2fQ.WEVBrGytvfQ5LUvwNndTD4XDP93dZCJ8Q36YYdWcRRirMJnCtCBuTWs_odlzPHa2"
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;