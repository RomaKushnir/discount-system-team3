import axios from './axiosClient';

export const uploadImage = (file) => {
  const data = new FormData();
  data.append('image', file);
  return axios.post('/image-upload/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const deleteImage = (data) => axios.delete('/image-upload/delete', data);
