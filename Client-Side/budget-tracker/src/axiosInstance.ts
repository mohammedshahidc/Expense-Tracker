import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3005/api/user',
  withCredentials: true,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    console.log('token:',token);
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
