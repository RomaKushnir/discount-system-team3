import * as types from '../actionTypes';

export function addVendor(payload) {
  return {
    type: types.ADD_VENDOR,
    payload
  };
}

export function updateVendor(payload) {
  return {
    type: types.UPDATE_VENDOR,
    payload
  };
}

export function updateVendorSuccess(payload) {
  return {
    type: types.UPDATE_VENDOR_SUCCESS,
    payload
  };
}

export function deleteVendor(payload) {
  return {
    type: types.DELETE_VENDOR,
    payload
  };
}

export function deleteVendorSuccess(payload) {
  return {
    type: types.DELETE_VENDOR_SUCCESS,
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
