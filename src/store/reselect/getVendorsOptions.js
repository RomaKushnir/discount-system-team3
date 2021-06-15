import { createSelector } from 'reselect';

const vendorsList = (state) => state.vendorReducer.vendors;

const getVendorsOptions = createSelector(
  vendorsList,
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

export default getVendorsOptions;
