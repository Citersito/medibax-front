// src/services/apiService.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error) => {
  console.error('Error al conectar con la API:', error.message);
  return null;
};

export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default apiClient;
