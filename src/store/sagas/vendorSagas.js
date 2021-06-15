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
  } catch (error) {
    console.error(error);
  }
}

export function* deleteVendor({ payload }) {
  try {
    const response = yield call(services.vendorService.deleteVendor, payload);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export function* getVendors() {
  try {
    const response = yield call(services.vendorService.getVendors);

    yield put(actions.vendorActions.getVendorsSuccess(response));
  } catch (error) {
    console.error(error);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_VENDOR, addVendor),
    takeEvery(types.DELETE_VENDOR, deleteVendor),
    takeEvery(types.GET_VENDORS, getVendors)
  ]);
}
