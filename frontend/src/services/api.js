import axios from 'axios';

const api = axios.create({
  baseURL: 'https://health-record-management-system-ho04.onrender.com',
});
api.defaults.withCredentials = true;

export default api;
