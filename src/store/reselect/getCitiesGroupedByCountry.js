import { createSelector } from 'reselect';

const locationsList = (state) => state.locationReducer.locationsList;

const getCitiesGroupedByCountryOptions = createSelector(
  locationsList,
  (items) => {
    const locationsObject = items.reduce((acc, location) => {
      acc[location.country] = [...acc[location.country] || [], {
        id: location.id,
        value: location.city,
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

export default getCitiesGroupedByCountryOptions;
