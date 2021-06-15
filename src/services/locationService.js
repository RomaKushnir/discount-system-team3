// import axios from 'API';
import locationsList from '../mockData/locationsList';

export const getLocations = () => {
  console.log('Get locations!'); // temporary to check flow

  return locationsList; // temporary to check flow
};

export const getLocationById = (locationId) => {
  console.log(locationId); // temporary to check flow

  const response = locationsList.filter((el) => el.countryId === locationId);

  return response; // temporary to check flow
};
