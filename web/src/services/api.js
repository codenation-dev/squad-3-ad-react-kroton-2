import axios from 'axios';

const api = axios.create({
  baseURL: 'https://loggerio-api.herokuapp.com/',
  timeout: 10000,
});

export default api;
