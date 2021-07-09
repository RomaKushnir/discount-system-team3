import axios from './axiosClient';

export const addCategory = (data) => {
  console.log(data);
  return axios.post(`/categories`, data);
};

export const updateCategory = ({ id, ...data }) => {
  console.log(data);
  return axios.put(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  console.log(id);
  return axios.delete(`/categories/${id}`);
};

export const getCategories = () => axios.get('/categories');

export const getCategoryById = (id) => axios.get(`/categories/${id}`);

export const addTagsToCategory = (data) => {
  console.log(data);
  return axios.post(`/categories/${data.categoryId}/tags`, data.tags);
};

export const deleteTagsFromCategory = (data) => {
  console.log(data);
  return axios.delete(`/categories/${data.categoryId}/tags`, data.tags);
};
