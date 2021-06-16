import { createSelector } from 'reselect';

export const getVendorsList = (state) => state.vendorReducer.vendors;

export const getVendorsOptions = createSelector(
  getVendorsList,
  (items) => items.reduce((acc, item) => {
    const obj = {
      id: item.id,
      value: item.title,
      label: item.title
    };
    acc.push(obj);
    return acc;
  }, [])
);
