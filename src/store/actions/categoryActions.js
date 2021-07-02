import * as types from '../actionTypes';

export function addCategory(payload) {
  console.log(payload);
  return {
    type: types.ADD_CATEGORY,
    payload
  };
}

export function addCategorySuccess(payload) {
  return {
    type: types.ADD_CATEGORY_SUCCESS,
    payload
  };
}

export function addCategoryFailure(payload) {
  return {
    type: types.ADD_CATEGORY_FAILURE,
    payload
  };
}

export function updateCategorySuccess(payload) {
  return {
    type: types.UPDATE_CATEGORY_SUCCESS,
    payload
  };
}

export function clearAddCategoryStatus() {
  return {
    type: types.CLEAR_ADD_CATEGORY_STATUS
  };
}

export function getCategories() {
  return {
    type: types.GET_CATEGORIES
  };
}

export function getCategoriesSuccess(payload) {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    payload
  };
}

export function getCategoriesFailure(payload) {
  return {
    type: types.GET_CATEGORIES_FAILURE,
    payload
  };
}

export function clearGetCategoriesStatus() {
  return {
    type: types.CLEAR_GET_CATEGORIES_STATUS
  };
}

export function deleteCategory(payload) {
  return {
    type: types.DELETE_CATEGORY,
    payload
  };
}

export function deleteCategorySuccess(payload) {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    payload
  };
}

export function deleteCategoryFailure(payload) {
  return {
    type: types.DELETE_CATEGORY_FAILURE,
    payload
  };
}

export function clearDeleteCategoryStatus() {
  return {
    type: types.CLEAR_DELETE_CATEGORY_STATUS
  };
}
