import * as types from '../actionTypes';

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

export function getVendorsFailure(payload) {
  return {
    type: types.GET_VENDORS_FAILURE,
    payload
  };
}

export function addVendor(payload) {
  return {
    type: types.ADD_VENDOR,
    payload
  };
}

export function addVendorSuccess(payload) {
  return {
    type: types.ADD_VENDOR_SUCCESS,
    payload
  };
}

export function addVendorFailure(payload) {
  return {
    type: types.ADD_VENDOR_FAILURE,
    payload
  };
}

export function updateVendorSuccess(payload) {
  return {
    type: types.UPDATE_VENDOR_SUCCESS,
    payload
  };
}

export function addVendorClearStatus() {
  return {
    type: types.ADD_VENDOR_CLEAR_STATUS
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

export function deleteVendorFailure(payload) {
  return {
    type: types.DELETE_VENDOR_FAILURE,
    payload
  };
}
