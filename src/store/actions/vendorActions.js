import * as types from '../actionTypes';

export function getVendors(payload) {
  return {
    type: types.GET_VENDORS,
    payload
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

export function clearGetVendorsStatus() {
  return {
    type: types.CLEAR_GET_VENDORS_STATUS
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

export function updateVendorsFilters(payload) {
  return {
    type: types.UPDATE_VENDORS_FILTERS,
    payload

  };
}

export function applyVendorsFilters(payload) {
  return {
    type: types.APPLY_VENDORS_FILTERS,
    payload
  };
}

export function getTypeaheadVendors(payload) {
  return {
    type: types.GET_TYPEAHEAD_VENDORS,
    payload

  };
}

export function getTypeaheadVendorsSuccess(payload) {
  return {
    type: types.GET_TYPEAHEAD_VENDORS_SUCCESS,
    payload

  };
}

export function getTypeaheadVendorsFailure(payload) {
  return {
    type: types.GET_TYPEAHEAD_VENDORS_FAILURE,
    payload

  };
}

export function clearVendorsTypeahead() {
  return {
    type: types.CLEAR_VENDORS_TYPEAHEAD
  };
}

export function clearVendorsFilters() {
  return {
    type: types.CLEAR_VENDORS_FILTERS
  };
}

export function addVendorModalStatus(payload) {
  return {
    type: types.ADD_VENDOR_MODAL_STATUS,
    payload
  };
}
export function getSubscribedVendors() {
  return {
    type: types.GET_SUBSCRIBED_VENDORS
  };
}

export function getSubscribedVendorsSuccess(payload) {
  return {
    type: types.GET_SUBSCRIBED_VENDORS_SUCCESS,
    payload
  };
}

export function getSubscribedVendorsFailure(payload) {
  return {
    type: types.GET_SUBSCRIBED_VENDORS_FAILURE,
    payload
  };
}

export function clearSubscribedVendorsStatus() {
  return {
    type: types.CLEAR_SUBSCRIBED_VENDORS_STATUS
  };
}

export function vendorSubscribe(payload) {
  return {
    type: types.VENDOR_SUBSCRIBE,
    payload
  };
}

export function vendorSubscribeSuccess(payload) {
  return {
    type: types.VENDOR_SUBSCRIBE_SUCCESS,
    payload
  };
}

export function vendorSubscribeFailure(payload) {
  return {
    type: types.VENDOR_SUBSCRIBE_FAILURE,
    payload
  };
}

export function clearVendorSubscribeStatus() {
  return {
    type: types.CLEAR_VENDOR_SUBSCRIBE_STATUS
  };
}

export function vendorUnsubscribe(payload) {
  return {
    type: types.VENDOR_UNSUBSCRIBE,
    payload
  };
}

export function vendorUnsubscribeSuccess(payload) {
  return {
    type: types.VENDOR_UNSUBSCRIBE_SUCCESS,
    payload
  };
}

export function vendorUnsubscribeFailure(payload) {
  return {
    type: types.VENDOR_UNSUBSCRIBE_FAILURE,
    payload
  };
}

export function clearVendorUnsubscribeStatus() {
  return {
    type: types.CLEAR_VENDOR_UNSUBSCRIBE_STATUS
  };
}
