import * as types from '../actionTypes';

export function getDiscountsList() {
  return {
    type: types.GET_DISCOUNTS
  };
}

export function getDiscountsListSuccess(payload) {
  return {
    type: types.GET_DISCOUNTS_SUCCESS,
    payload
  };
}

export function getDiscountsListFailure(payload) {
  return {
    type: types.GET_DISCOUNTS_FAILURE,
    payload
  };
}

export function getDiscountsClearStatus() {
  return {
    type: types.CLEAR_GET_DISCOUNTS_STATUS
  };
}

export function createDiscount(payload) {
  return {
    type: types.CREATE_DISCOUNT,
    payload
  };
}

export function createDiscountSuccess(payload) {
  return {
    type: types.CREATE_DISCOUNT_SUCCESS,
    payload
  };
}

export function createDiscountFailure(payload) {
  return {
    type: types.CREATE_DISCOUNT_FAILURE,
    payload
  };
}

export function clearCreateDiscountStatus() {
  return {
    type: types.CLEAR_CREATE_DISCOUNT_STATUS
  };
}

export function deleteDiscount(payload) {
  return {
    type: types.DELETE_DISCOUNT,
    payload
  };
}

export function deleteDiscountSuccess(payload) {
  return {
    type: types.DELETE_DISCOUNT_SUCCESS,
    payload
  };
}

export function deleteDiscountFailure(payload) {
  return {
    type: types.DELETE_DISCOUNT_FAILURE,
    payload
  };
}

export function clearDeleteDiscountStatus() {
  return {
    type: types.CLEAR_DELETE_DISCOUNT_STATUS
  };
}

export function updateDiscountsFilters(payload) {
  return {
    type: types.UPDATE_DISCOUNTS_FILTERS,
    payload

  };
}

export function applyDiscountsFilters(payload) {
  return {
    type: types.APPLY_DISCOUNTS_FILTERS,
    payload
  };
}
