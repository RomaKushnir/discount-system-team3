import { createSelector } from 'reselect';

export const getDiscountsList = (state) => state.discountsReducer.discounts;

export const getDiscountsOptions = createSelector(
  getDiscountsList,
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
