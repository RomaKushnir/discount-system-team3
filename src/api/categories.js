import axios from './axiosClient';

export const addCategory = (data) => axios.post(`/categories`, data);

export const updateCategory = (data) => axios.put(`/categories/${data.id}`);

export const deleteCategory = (id) => axios.delete(`/categories/${id}`);

export const getCategories = () => axios.get('/categories');

export const getCategoryById = (id) => axios.get(`/categories/${id}`);

export const addTagsToCategory = (data) => axios.post(`/categories/${data.categoryId}/tags`, data.tags);

export const deleteTagsFromCategory = (data) => axios.delete(`/categories/${data.categoryId}/tags`, data.tags);
