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

export function addCategoryClearStatus() {
  return {
    type: types.ADD_CATEGORY_CLEAR_STATUS
  };
}
