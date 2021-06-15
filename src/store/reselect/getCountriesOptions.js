import { createSelector } from 'reselect';

const locationsList = (state) => state.locationReducer.locationsList;

const getCountriesOptions = createSelector(
  locationsList,
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

export default getCountriesOptions;
