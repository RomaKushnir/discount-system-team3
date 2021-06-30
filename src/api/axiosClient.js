import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandbox-discount.herokuapp.com/api/',
  responseType: 'json',
  withCredentials: true
  // headers: {
  //   'Access-Control-Allow-Headers': 'X-Custom-Header'
  // }

});

instance.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
    // request.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    // request.headers['Access-Control-Allow-Credentials'] = true;
  }

  return request;
});

console.log(instance);

export default instance;
