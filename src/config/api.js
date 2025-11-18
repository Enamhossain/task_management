// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://taskmange-server.onrender.com';

export const API_ENDPOINTS = {
  TASKS: `${API_URL}/tasks`,
  TASK_BY_ID: (id) => `${API_URL}/tasks/${id}`,
};

