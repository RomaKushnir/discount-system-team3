import axios from './axiosClient';

export const getDiscounts = (params) => axios.get(`/discounts${params}`);

export const getDiscountsById = (id) => axios.get(`/discounts/${id}`);

export const createDiscount = (data) => axios.post('/discounts', data);

export const updateDiscount = (data) => axios.put(`/discounts/${data.id}`, data);

export const deleteDiscount = (id) => axios.delete(`/discounts/${id}`);
