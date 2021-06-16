import * as types from '../actionTypes';

export function addVendor(payload) {
  return {
    type: types.ADD_VENDOR,
    payload
  };
}

export function deleteVendor(payload) {
  return {
    type: types.DELETE_VENDOR,
    payload
  };
}

export function getVendors() {
  return {
    type: types.GET_VENDORS
  };
}

export function getVendorsSuccess(payload) {
  return {
    type: types.GET_VENDORS_SUCCESS,
    payload
  };
}
