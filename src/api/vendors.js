import axios from './axiosClient';

export const addVendor = (data) => axios.post(`/vendors`, data);

export const updateVendor = (data) => axios.put(`/vendors/${data.id}`, data);

export const deleteVendor = (id) => axios.delete(`/vendors/${id}`);

export const getVendors = () => axios.get('/vendors');
