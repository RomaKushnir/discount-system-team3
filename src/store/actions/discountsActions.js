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
    type: types.GET_DISCOUNTS_CLEAR_STATUS
  };
}
