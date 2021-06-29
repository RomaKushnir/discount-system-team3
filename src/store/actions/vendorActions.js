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

export function clearAddVendorStatus() {
  return {
    type: types.CLEAR_ADD_VENDOR_STATUS
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

export function clearDeleteVendorStatus() {
  return {
    type: types.CLEAR_DELETE_VENDOR_STATUS
  };
}

export function getVendorById(payload) {
  return {
    type: types.GET_VENDOR_BY_ID,
    payload
  };
}

export function getVendorByIdSuccess(payload) {
  return {
    type: types.GET_VENDOR_BY_ID_SUCCESS,
    payload
  };
}

export function getVendorByIdFailure(payload) {
  return {
    type: types.GET_VENDOR_BY_ID_FAILURE,
    payload
  };
}

export function getFilteredVendors(payload) {
  return {
    type: types.GET_FILTERED_VENDORS,
    payload
  };
}

export function getFilteredVendorsSuccess(payload) {
  return {
    type: types.GET_FILTERED_VENDORS_SUCCESS,
    payload
  };
}

export function getFilteredVendorsFailure(payload) {
  return {
    type: types.GET_FILTERED_VENDORS_FAILURE,
    payload
  };
}

export function clearGetFilteredVendorsStatus() {
  return {
    type: types.CLEAR_GET_FILTERED_VENDORS_STATUS

  };
}
