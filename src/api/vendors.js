import axios from './axiosClient';

export const addVendor = (data) => {
  console.log(data); // temporary to check flow

  return 'Vendor successfully added'; // temporary to check flow
};

export const updateVendor = (data) => axios.put(`/vendors/${data.id}`, {});

export const deleteVendor = (id) => axios.delete(`/vendors/${id}`);

export const getVendors = () => {
  console.log('Get Vendors!'); // temporary to check flow
  return axios.get('/vendors');
};
