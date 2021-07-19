import * as types from '../actionTypes';

export function getLocationsList(payload) {
  return {
    type: types.GET_LOCATIONS_LIST,
    payload
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

export function clearLocationsData() {
  return {
    type: types.CLEAR_LOCATIONS_DATA
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

export function getCities(payload) {
  return {
    type: types.GET_CITIES,
    payload
  };
}

export function getCitiesSuccess(payload) {
  return {
    type: types.GET_CITIES_SUCCESS,
    payload
  };
}

export function getCitiesFailure(payload) {
  return {
    type: types.GET_CITIES_FAILURE,
    payload
  };
}

export function clearGetCitiesStatus() {
  return {
    type: types.CLEAR_GET_CITIES_STATUS
  };
}

export function clearCitiesData() {
  return {
    type: types.CLEAR_CITIES_DATA
  };
}

export function createLocation(payload) {
  return {
    type: types.CREATE_LOCATION,
    payload
  };
}

export function createLocationSuccess(payload) {
  return {
    type: types.CREATE_LOCATION_SUCCESS,
    payload
  };
}

export function createLocationFailure(payload) {
  return {
    type: types.CREATE_LOCATION_FAILURE,
    payload
  };
}

export function clearCreateLocationStatus() {
  return {
    type: types.CLEAR_CREATE_LOCATION_STATUS
  };
}
export function getCoordinates(payload) {
  return {
    type: types.GET_COORDINATES,
    payload
  };
}
