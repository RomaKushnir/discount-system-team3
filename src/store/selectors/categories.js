import { createSelector } from 'reselect';

export const getCategoriesList = (state) => state.categoryReducer.categories;

export const getCategoriesOptions = createSelector(
  getCategoriesList,
  (items) => items.reduce((acc, item) => {
    const obj = {
      id: item.id,
      value: item.id,
      label: item.title,
      tags: item.tags
    };
    acc.push(obj);
    return acc;
  }, [])
);
