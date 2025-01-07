import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/'; // Django API base URL

const API = axios.create({
    baseURL: API_URL,
});

export const getTasks = () => API.get('/tasks/');
export const createTask = (task) => API.post('/tasks/', task);
export const updateTask = (id, task) => API.put(`/tasks/${id}/`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}/`);

export const toggleTaskCompletion = async (taskId) => {
    try {
        const response = await axios.patch(`${API_URL}tasks/${taskId}/toggle-completed/`);
        return response.data;
    } catch (error) {
        console.error('Error toggling task status:', error);
        throw error;
    }
};
