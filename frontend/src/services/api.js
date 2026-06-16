import axios from 'axios';

const api = axios.create({
  baseURL: 'https://health-record-management-system-ho04.onrender.com',
  withCredentials:true
});

export default api;
