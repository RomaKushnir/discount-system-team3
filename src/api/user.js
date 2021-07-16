import axios from './axiosClient';

export const login = (data) => axios.post('https://sandbox-discount.herokuapp.com/signin', data);

export const getUser = () => axios.get('/users/current');

export const getQRCode = (data) => axios.get(
  `/user-discount/${data.userId}/${data.discountId}`,
  { responseType: 'blob' }
)
  .then((response) => URL.createObjectURL(response.data));
