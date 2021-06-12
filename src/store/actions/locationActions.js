import * as types from '../actionTypes';

export function getCountriesList() {
  return {
    type: types.GET_COUNTRIES_LIST
  };
}

export function getCountriesListSuccess(payload) {
  return {
    type: types.GET_COUNTRIES_LIST_SUCCESS,
    payload
  };
}

export function getAllCitiesList() {
  return {
    type: types.GET_ALL_CITIES_LIST
  };
}

export function getAllCitiesListSuccess(payload) {
  return {
    type: types.GET_ALL_CITIES_LIST_SUCCESS,
    payload
  };
}

export function getSelectedCitiesList(payload) {
  return {
    type: types.GET_SELECTED_CITIES_LIST,
    payload
  };
}

export function getSelectedCitiesListSuccess(payload) {
  return {
    type: types.GET_SELECTED_CITIES_LIST_SUCCESS,
    payload
  };
}
