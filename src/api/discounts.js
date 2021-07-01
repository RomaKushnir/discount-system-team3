import axios from './axiosClient';

export const getDiscounts = () => axios.get('/discounts');

export const getDiscountsById = (id) => axios.get(`/discounts/${id}`);

export const createDiscount = (data) => axios.post('/discounts', data);

<<<<<<< HEAD
export const updateDiscount = (data) => axios.put(`/discounts/${data.id}`, data);
=======
export const deleteDiscount = (id) => axios.delete(`/discounts/${id}`);
>>>>>>> a98147f (feat: implement delete discount redux flow)
