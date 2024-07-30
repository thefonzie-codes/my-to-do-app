// src/api/axios.js
import axios from 'axios';
import Cookies from 'js-cookie';

const ENVIRONMENT = import.meta.env.MODE

let baseURL = 'https://my-to-do-app-production.up.railway.app'

if (ENVIRONMENT === "development") {
  baseURL = "http://localhost:8000"
}

const axiosInstance = axios.create({
  baseURL: 'https://my-to-do-app-production.up.railway.app'
});

axiosInstance.interceptors.request.use(function (config) {
  const token = Cookies.get('token');
  config.headers.Authorization = token ? `Token ${token}` : '';
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default axiosInstance;