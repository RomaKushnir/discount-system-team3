import { createSelector } from 'reselect';

export const getCountries = (state) => state.locationReducer.countries;
export const getCities = (state) => state.locationReducer.cities;
export const getLocationsList = (state) => state.locationReducer.locationsList;

export const getCitiesGroupedByCountryOptions = createSelector(
  getLocationsList,
  (items) => {
    const locationsObject = items.reduce((acc, location) => {
      acc[location.country] = [...acc[location.country] || [], {
        id: location.id,
        value: location.id,
        label: location.city
      }];

      return acc;
    }, {});

    const locationOptions = Object.keys(locationsObject).reduce((acc, key) => {
      const obj = { label: key, options: locationsObject[key] };
      acc.push(obj);
      return acc;
    }, []);

    return locationOptions;
  }
);

export const getLocationsOptions = createSelector(
  getLocationsList,
  (locations) => locations.reduce((res, location) => {
    const { id, ...data } = location;
    if (data.addressLine !== '') {
      res.push({
        value: location,
        label: data.addressLine
      });
    }
    return res;
  }, [])
);

export const getCountriesOptions = createSelector(
  getCountries,
  (countries) => countries.map((country) => ({
    ...country,
    value: country.countryCode,
    label: country.countryFullName
  }))
);

export const getCitiesOptions = createSelector(
  getCities,
  (cities) => cities
    .map((el) => el.city)
    .filter((el, i, arr) => arr.indexOf(el) === i && el)
    .map((el) => ({ value: el, label: el }))
);
