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

export function* createLocation({ payload }) {
  try {
    const { countryCode, city, addressLine } = payload;
    const searchAddress = `${countryCode},${city},${addressLine}`;
    const geocodeResponse = yield call(api.locations.getGeocode, searchAddress);
    if (geocodeResponse.status === 'OK') {
      const { lat: latitude, lng: longitude } = geocodeResponse.results[0].geometry.location;
      const fullLocation = { ...payload, ...{ latitude, longitude } };
      const response = yield call(api.locations.createLocation, fullLocation);
      yield put(actions.locationActions.createLocationSuccess(response));
      // toast.success('Location successfully created');
    } else {
      toast.error('Please enter correct address');
    }
  } catch (error) {
    console.error(error);
    console.log('SAGA', error.response.data);
    yield put(actions.locationActions.createLocationFailure(error.response.data));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_LOCATIONS_LIST, getLocations),
    takeEvery(types.GET_LOCATION_BY_ID, getLocationById),
    takeEvery(types.GET_COUNTRIES, getCountries),
    takeEvery(types.GET_CITIES, getCities),
    takeEvery(types.CREATE_LOCATION, createLocation)
  ]);
}
