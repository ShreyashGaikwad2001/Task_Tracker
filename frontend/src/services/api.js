import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Auth - User Authentication
export const login = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const signup = async (data) => {
  try {
    const response = await api.post('/auth/signup', data);
    return response;
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    throw err;
  }
};

// Password Reset (Direct Reset: email + newPassword)
export const resetPassword = async ({ email, newPassword }) => {
  try {
    const response = await api.post('/auth/reset-password', { email, newPassword });
    return response;
  } catch (err) {
    console.error("Password reset error:", err.response?.data || err.message);
    throw err;
  }
};

// Projects - Fetch and Create Projects
export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response;
  } catch (err) {
    console.error("Error fetching projects:", err.response?.data || err.message);
    throw err;
  }
};

export const createProject = async (data) => {
  try {
    const response = await api.post('/projects', data);
    return response;
  } catch (err) {
    console.error("Error creating project:", err.response?.data || err.message);
    throw err;
  }
};

// Tasks - Fetch and Create Tasks
export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response;
  } catch (err) {
    console.error("Error fetching tasks:", err.response?.data || err.message);
    throw err;
  }
};

export const createTask = async (data) => {
  try {
    const response = await api.post('/tasks', data);
    return response;
  } catch (err) {
    console.error("Error creating task:", err.response?.data || err.message);
    throw err;
  }
};
