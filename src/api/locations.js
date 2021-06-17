import axios from './axiosClient';

export const getLocations = () => axios.get('/locations');

export const getLocationById = (locationId) => axios.get(`/locations/${locationId}`);
