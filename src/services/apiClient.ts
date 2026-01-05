import axios from 'axios';
import { API_CONFIG } from '../constants/app.constants';
import { STORAGE_KEYS } from "../constants/app.constants";
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token ="eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiUk9MRV9BRE1JTiIsImlhdCI6MTc2NzYyMjQwMCwiZXhwIjoxNzY3NzA4ODAwfQ.mjfNvn1EWpg8930sjPbgSG04LDuwvjUTrhVrjxAhGE4jsgE-YVxsy8Lk71CN1hte";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default apiClient;