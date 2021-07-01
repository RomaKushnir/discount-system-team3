import axios from './axiosClient';

export const login = (data) => axios.post('https://sandbox-discount.herokuapp.com/signin', data);

export const getUser = (data) => {
  console.log(data);
};
