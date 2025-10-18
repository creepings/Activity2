import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (username: string, password: string) => {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  },
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
};

export const notesAPI = {
  getAll: async () => {
    const response = await api.get('/notes');
    return response.data;
  },
  create: async (title: string, content: string) => {
    const response = await api.post('/notes', { title, content });
    return response.data;
  },
  update: async (id: number, title: string, content: string) => {
    const response = await api.patch(`/notes/${id}`, { title, content });
    return response.data;
  },
  delete: async (id: number) => {
    await api.delete(`/notes/${id}`);
  },
};

export default api;