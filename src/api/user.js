import axios from './axiosClient';

export const login = (data) => {
  console.log(data);

  const response = axios.post('https://sandbox-discount.herokuapp.com/signin', data);

  console.log(response);

  return response;
};

export const getUser = (data) => {
  console.log(data);
};
