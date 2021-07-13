import axios from './axiosClient';

export const getLocations = (searchParams) => axios.get(`/locations${searchParams}`);

export const getLocationById = (locationId) => axios.get(`/locations/${locationId}`);

export const getCountries = () => axios.get('/locations/countries');

export const getCities = (countryCode) => axios.get(`/locations/cities/?countryCode=${countryCode}`);

export const createLocation = (data) => axios.post('/locations', data);

export const getGeocode = (data) => fetch(
  `https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=${process.env.REACT_APP_GEO_API_KEY}`
).then((res) => res.json()).then((res) => res);
