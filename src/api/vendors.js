import axios from './axiosClient';

export const addVendor = (data) => axios.post(`/vendors`, data);

export const updateVendor = (data) => axios.put(`/vendors/${data.id}`, data);

export const deleteVendor = (id) => axios.delete(`/vendors/${id}`);

export const getVendors = () => axios.get('/vendors');

export const getVendorById = (id) => axios.get(`/vendors/${id}`);

export const getFilteredVendors = (payload) => {
  console.log(payload);
  const { sort, ...query } = payload;

  console.log(sort, query);
  const str = Object.keys(query)
    .filter((el) => payload[el] !== null && payload[el] !== '')
    .map((key) => `${key}:${encodeURIComponent(payload[key])}`)
    .join(';')
    .split('_')
    .join('.')
    .replace(';description:', ';description*:*');

  console.log(str);
  const queryParams = `?query=${str};`;

  const sortParams = `&sort=title,${sort}`;

  console.log(queryParams);
  console.log(sortParams);
  return axios.get(`/vendors${queryParams}${sortParams}`);
};
