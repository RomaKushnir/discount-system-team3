import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as actions from '../actions';
import * as services from '../../services';

export function* getLocations() {
  try {
    const response = yield call(services.locationService.getLocations);

    yield put(actions.locationActions.getLocationsListSuccess(response));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.locationActions.getLocationsListFailure(error));
  }
}

export function* getLocationById({ payload }) {
  try {
    const response = yield call(services.locationService.getLocationById, payload);

    yield put(actions.locationActions.getLocationByIdSuccess(response));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.locationActions.getLocationByIdFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_LOCATIONS_LIST, getLocations),
    takeEvery(types.GET_LOCATION_BY_ID, getLocationById)
  ]);
}
