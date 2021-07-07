import axios from './axiosClient';

export const getLocations = () => axios.get('/locations');

export const getLocationById = (locationId) => axios.get(`/locations/${locationId}`);

export const getCountries = () => axios.get('/countries'); // CHECK WITH BE
