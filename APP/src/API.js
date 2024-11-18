import axios from 'axios';

// Buat instance Axios
const api = axios.create({
  baseURL: 'http://192.168.241.175:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
