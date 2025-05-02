import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Change if using a different backend URL

// Create a default axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (data) => api.post('/login', data);
export const signup = (data) => api.post('/signup', data);
export const forgotPassword = (data) => api.post('/forgot-password', data);
export const resetPassword = (data) => api.post('/reset-password', data);

// Project APIs
export const getProjects = () => api.get('/projects');
export const addProject = (data) => api.post('/projects', data);
export const deleteProject = (projectId) => api.delete(`/projects/${projectId}`);

// Task APIs
export const addTask = (data) => api.post('/tasks', data);
export const deleteTask = (data) => api.delete('/tasks', { data });

export default api;
