import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Django API URL
});

export const getTasks = () => API.get('/tasks/');
export const createTask = (task) => API.post('/tasks/', task);
export const updateTask = (id, task) => API.put(`/tasks/${id}/`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}/`);
