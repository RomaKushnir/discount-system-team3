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

export function getLocationsListFailure(payload) {
  return {
    type: types.GET_LOCATIONS_LIST_FAILURE,
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

export function getLocationByIdFailure(payload) {
  return {
    type: types.GET_LOCATION_BY_ID_FAILURE,
    payload
  };
}

export function getCountries() {
  return {
    type: types.GET_COUNTRIES
  };
}

export function getCountriesSuccess(payload) {
  return {
    type: types.GET_COUNTRIES_SUCCESS,
    payload
  };
}

export function getCountriesFailure(payload) {
  return {
    type: types.GET_COUNTRIES_FAILURE,
    payload
  };
}

export function clearGetCountriesStatus() {
  return {
    type: types.CLEAR_GET_COUNTRIES_STATUS
  };
}
