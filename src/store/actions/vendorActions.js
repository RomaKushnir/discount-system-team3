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
