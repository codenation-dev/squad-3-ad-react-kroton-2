import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_NOT_SECRET_CODE,
  timeout: 10000,
});

export default api;
