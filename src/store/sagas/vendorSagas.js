import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as services from '../../services';
import * as actions from '../actions';

export function* addVendor({ payload }) {
  const { id, ...data } = payload;

  let response;

  try {
    if (id === '') {
      response = yield call(services.vendorService.addVendor, data);
    } else {
      response = yield call(services.vendorService.updateVendor, payload);
    }

    console.log(response);
    yield put(actions.vendorActions.addVendorSuccess(response));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.vendorActions.addVendorFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_VENDOR, addVendor)
  ]);
}
