import axios from './axiosClient';

export const getLocations = (searchParams) => axios.get(`/locations${searchParams}`);

export const getLocationById = (locationId) => axios.get(`/locations/${locationId}`);

export const getCountries = () => axios.get('/locations/countries');

export const getCities = (countryCode) => axios.get(`/locations/cities/?countryCode=${countryCode}`);
