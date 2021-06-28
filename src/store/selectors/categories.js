import { createSelector } from 'reselect';

export const getAllCategories = (state) => state.categoryReducer.categories;

export const getCategoriesOptions = createSelector(
  getAllCategories,
  (items) => items.reduce((acc, item) => {
    const obj = {
      value: item.id,
      label: item.title
    };
    acc.push(obj);
    return acc;
  }, [])
);
