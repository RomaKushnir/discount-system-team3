import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sandbox-discount.herokuapp.com/api/',
  responseType: 'json',
  headers: {
    // 'Access-Control-Allow-Origin': '*'
  }
});

export default instance;
