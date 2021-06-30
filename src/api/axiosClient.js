import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandbox-discount.herokuapp.com/api/',
  responseType: 'json'
  // withCredentials: true
});

instance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

console.log(instance);

export default instance;
