import axios from './axiosClient';

export const getDiscounts = () => {
  console.log('discounts api');
  return axios.get('/discounts');
};

export const getDiscountsById = (id) => axios.get(`/discounts/${id}`);
