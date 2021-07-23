import axios from './axiosClient';

export const addCategory = (data) => axios.post(`/categories`, data);

export const updateCategory = ({ id, ...data }) => axios.put(`/categories/${id}`, data);

export const deleteCategory = (id) => axios.delete(`/categories/${id}`);

export const getCategories = () => axios.get('/categories');

export const getCategoryById = (id) => axios.get(`/categories/${id}`);

export const addTagsToCategory = (data) => axios.post(`/categories/${data.categoryId}/tags`, data.tags);

export const deleteTagsFromCategory = (data) => axios.delete(
  `/categories/${data.categoryId}/tags`, { data: data.tags }
);

export const getTagsByCategory = (categoryId) => axios.get(`tags/category/${categoryId}`);
