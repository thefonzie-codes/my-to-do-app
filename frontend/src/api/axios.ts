// src/api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000' // Ensure you define your base URL
  baseURL: 'https://my-to-do-app-production.up.railway.app', // Ensure you define your base URL
});

axiosInstance.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  config.headers.Authorization = token ? `Token ${token}` : '';
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;
