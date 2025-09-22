import axios from 'axios';

// Get the API base URL from environment variables
const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await api.post('/auth/refresh', { refreshToken });
          const { token: newToken, refreshToken: newRefreshToken } = response.data;
          
          // Store new tokens
          localStorage.setItem('token', newToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          // Retry original request
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (email: string, password: string, role: string) => 
    api.post('/auth/login', { email, password, role }),
  register: (userData: any) => 
    api.post('/auth/register', userData),
  logout: () => 
    api.post('/auth/logout'),
  refresh: (refreshToken: string) => 
    api.post('/auth/refresh', { refreshToken }),
};

// Task APIs
export const taskAPI = {
  getAllTasks: () => api.get('/tasks'),
  getTaskById: (id: number) => api.get(`/tasks/${id}`),
  createTask: (taskData: any) => api.post('/tasks', taskData),
  updateTask: (id: number, taskData: any) => api.put(`/tasks/${id}`, taskData),
  deleteTask: (id: number) => api.delete(`/tasks/${id}`),
  getMyTasks: () => api.get('/tasks/my'),
  getTeamTasks: () => api.get('/tasks/team'),
};

// Leave APIs
export const leaveAPI = {
  getAllLeaves: () => api.get('/leaves'),
  getLeaveById: (id: number) => api.get(`/leaves/${id}`),
  createLeave: (leaveData: any) => api.post('/leaves', leaveData),
  updateLeave: (id: number, leaveData: any) => api.put(`/leaves/${id}`, leaveData),
  deleteLeave: (id: number) => api.delete(`/leaves/${id}`),
  getMyLeaves: () => api.get('/leaves/my'),
  getTeamLeaves: () => api.get('/leaves/team'),
};

// Dropdown APIs
export const dropdownAPI = {
  getAllDropdowns: () => api.get('/dropdowns'),
  getDropdownById: (id: number) => api.get(`/dropdowns/${id}`),
  createDropdown: (dropdownData: any) => api.post('/dropdowns', dropdownData),
  updateDropdown: (id: number, dropdownData: any) => api.put(`/dropdowns/${id}`, dropdownData),
  deleteDropdown: (id: number) => api.delete(`/dropdowns/${id}`),
  getDropdownsByName: (name: string) => api.get(`/dropdowns/name/${name}`),
};

// File APIs
export const fileAPI = {
  uploadFile: (file: File, taskId?: number) => {
    const formData = new FormData();
    formData.append('file', file);
    if (taskId) {
      formData.append('taskId', taskId.toString());
    }
    return api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteFile: (id: number) => api.delete(`/files/${id}`),
};

// User APIs
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getUserById: (id: number) => api.get(`/users/${id}`),
  createUser: (userData: any) => api.post('/users', userData),
  updateUser: (id: number, userData: any) => api.put(`/users/${id}`, userData),
  deleteUser: (id: number) => api.delete(`/users/${id}`),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData: any) => api.put('/users/profile', userData),
};

export default api;