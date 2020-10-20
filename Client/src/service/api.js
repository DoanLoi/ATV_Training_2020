import axios from 'axios' 
let token=localStorage.getItem('token');
const instance = axios.create({
   baseURL: 'http://localhost:2108'
})
export default instance;




instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${ token }`;
    }

    return config;
  }, 

  (error) => {
    return Promise.reject(error);
  }
);
