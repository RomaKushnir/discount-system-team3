import axios from './axiosClient';

export const getDiscounts = (params) => axios.get(`/discounts${params}`);

export const getDiscountById = (id) => axios.get(`/discounts/${id}`);

export const createDiscount = (data) => axios.post('/discounts', data);

export const updateDiscount = (data) => axios.put(`/discounts/${data.id}`, data);

export const deleteDiscount = (id) => axios.delete(`/discounts/${id}`);

export const getVendorDiscounts = (params) => axios.get(`/discounts${params}`);

export const activateDiscount = (data) => axios.post('/user-discount', data);

export const getDiscountInfo = ({ userId, discountId }) => axios.get(`/qrcode/${userId}/${discountId}`);
