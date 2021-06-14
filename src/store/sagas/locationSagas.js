import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as actions from '../actions';
import * as services from '../../services';

export function* getCountries() {
  try {
    const response = yield call(services.locationService.getCountries);

    yield put(actions.locationActions.getCountriesListSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* getAllCities() {
  try {
    const response = yield call(services.locationService.getAllCities);

    yield put(actions.locationActions.getAllCitiesListSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* getSelectedCities({ payload }) {
  try {
    const response = yield call(services.locationService.getSelectedCities, payload);

    yield put(actions.locationActions.getSelectedCitiesListSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_COUNTRIES_LIST, getCountries),
    takeEvery(types.GET_ALL_CITIES_LIST, getAllCities),
    takeEvery(types.GET_SELECTED_CITIES_LIST, getSelectedCities)
  ]);
}
