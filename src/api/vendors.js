import axios from './axiosClient';

export const addVendor = (data) => axios.post(`/vendors`, data);

export const updateVendor = (data) => axios.put(`/vendors/${data.id}`, data);

export const deleteVendor = (id) => axios.delete(`/vendors/${id}`);

export const getVendors = (params) => {
  console.log(params);

  return axios.get(`/vendors${params}`);
};
// export const getVendors = (params) => axios.get(`${params}`);

export const getVendorById = (id) => axios.get(`/vendors/${id}`);
