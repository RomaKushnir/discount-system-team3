import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as types from '../actionTypes';
import * as actions from '../actions';
import * as api from '../../api';

export function* getLocations({ payload }) {
  try {
    const searchParams = `?query=city:${payload}`;

    const response = yield call(api.locations.getLocations, searchParams);

    yield put(actions.locationActions.getLocationsListSuccess(response.data));
  } catch (error) {
    console.error(error);
    yield put(actions.locationActions.getLocationsListFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getLocationById({ payload }) {
  try {
    const response = yield call(api.locations.getLocationById, payload);

    yield put(actions.locationActions.getLocationByIdSuccess(response.data));
  } catch (error) {
    console.error(error);
    yield put(actions.locationActions.getLocationByIdFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getCountries() {
  try {
    const response = yield call(api.locations.getCountries);

    yield put(actions.locationActions.getCountriesSuccess(response.data));
  } catch (error) {
    yield put(actions.locationActions.getCountriesFailure(error));
  }
}

export function* getCities({ payload }) {
  try {
    const response = yield call(api.locations.getCities, payload);

    yield put(actions.locationActions.getCitiesSuccess(response.data));
  } catch (error) {
    yield put(actions.locationActions.getCitiesFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_LOCATIONS_LIST, getLocations),
    takeEvery(types.GET_LOCATION_BY_ID, getLocationById),
    takeEvery(types.GET_COUNTRIES, getCountries),
    takeEvery(types.GET_CITIES, getCities)
  ]);
}
