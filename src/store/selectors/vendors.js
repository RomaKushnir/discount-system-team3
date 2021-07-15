import { createSelector } from 'reselect';

export const getVendorsList = (state) => state.vendorReducer.vendors;
export const getTypeaheadVendorsList = (state) => state.vendorReducer.vendorsTypeahead;

export const getVendorsOptions = createSelector(
  getVendorsList,
  (items) => items.reduce((acc, item) => {
    const obj = {
      id: item.id,
      value: item.id,
      label: item.title
    };
    acc.push(obj);
    return acc;
  }, [])
);

export const getTypeaheadVendorsOptions = createSelector(
  getTypeaheadVendorsList,
  (items) => items.reduce((acc, item) => {
    const obj = {
      id: item.id,
      value: item.id,
      label: item.title,
      locations: item.locations
    };
    acc.push(obj);
    return acc;
  }, [])
);
