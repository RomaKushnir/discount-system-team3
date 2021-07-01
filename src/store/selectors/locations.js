import { createSelector } from 'reselect';

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

export const getCountriesOptions = createSelector(
  getLocationsList,
  (items) => {
    const array = items.reduce((acc, item) => [...acc, item.country], []);
    const uniqueArray = [...new Set(array)];
    const countries = uniqueArray.reduce((acc, item) => {
      const newObj = {
        label: item,
        value: item
      };
      acc.push(newObj);
      return acc;
    }, []);
    return countries;
  }
);

export const getCitiesOptions = createSelector(
  getLocationsList,
  (locations) => locations.reduce((acc, location) => {
    const obj = {
      id: location.id,
      value: location.id,
      label: location.city,
      country: location.country
    };
    acc.push(obj);
    return acc;
  }, [])
);

export const getLocationsOptions = createSelector(
  getLocationsList,
  (locations) => locations.reduce((res, location) => {
    const { id, ...data } = location;
    const locationValues = Object.values(data);
    const labelValue = locationValues.join(', ');
    res.push({
      value: id,
      label: labelValue
    });
    return res;
  }, [])
);
