// import axios from 'axios';
import countriesList from '../mockData/countriesList';
import citiesList from '../mockData/citiesList';

export const getCountries = () => {
  console.log('Get countries!'); // temporary to check flow

  return countriesList; // temporary to check flow
};

export const getAllCities = () => {
  console.log('Get all cities!'); // temporary to check flow

  return citiesList; // temporary to check flow
};

export const getSelectedCities = (countryId) => {
  console.log(countryId); // temporary to check flow

  const response = citiesList.filter((el) => el.countryId === countryId);

  return response; // temporary to check flow
};
