import * as types from '../actionTypes';

export function getLocationsList() {
  return {
    type: types.GET_LOCATIONS_LIST
  };
}

export function getLocationsListSuccess(payload) {
  return {
    type: types.GET_LOCATIONS_LIST_SUCCESS,
    payload
  };
}

export function getLocationById(payload) {
  return {
    type: types.GET_LOCATION_BY_ID,
    payload
  };
}

export function getLocationByIdSuccess(payload) {
  return {
    type: types.GET_LOCATION_BY_ID_SUCCESS,
    payload
  };
}
