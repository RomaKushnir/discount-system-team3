import axios from './axiosClient';

export const addVendor = (data) => axios.post(`/vendors`, data);

export const updateVendor = (data) => axios.put(`/vendors/${data.id}`, data);

export const deleteVendor = (id) => axios.delete(`/vendors/${id}`);

export const getVendors = (params) => axios.get(`/vendors${params}`);

export const getVendorById = (id) => axios.get(`/vendors/${id}`);

export const getSubscribedVendors = () => axios.get('/users/subscribersIds');

export const vendorSubscribe = (id) => axios.get(`/vendors/${id}/subscribe`);

export const vendorUnsubscribe = (id) => axios.get(`/vendors/${id}/unsubscribe`);
