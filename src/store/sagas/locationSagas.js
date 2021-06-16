import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as actions from '../actions';
import * as api from '../../api';

export function* getLocations() {
  try {
    const response = yield call(api.locations.getLocations);

    yield put(actions.locationActions.getLocationsListSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export function* getLocationById({ payload }) {
  try {
    const response = yield call(api.locations.getLocationById, payload);

    yield put(actions.locationActions.getLocationByIdSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_LOCATIONS_LIST, getLocations),
    takeEvery(types.GET_LOCATION_BY_ID, getLocationById)
  ]);
}
