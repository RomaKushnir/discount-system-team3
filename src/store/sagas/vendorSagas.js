import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as api from '../../api';
import * as actions from '../actions';

export function* addVendor({ payload }) {
  const { id, ...data } = payload;

  let response;

  try {
    if (id === '') {
      response = yield call(api.vendors.addVendor, data);
      yield put(actions.vendorActions.addVendorSuccess(response.data));
    } else {
      response = yield call(api.vendors.updateVendor, payload);
      yield put(actions.vendorActions.updateVendorSuccess(response.data));
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    console.log(error.response);
    console.log(error.request);
    console.log(error.config);
    yield put(actions.vendorActions.addVendorFailure(error));
  }
}

export function* deleteVendor({ payload }) {
  try {
    yield call(api.vendors.deleteVendor, payload);

    yield put(actions.vendorActions.deleteVendorSuccess(payload));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.vendorActions.deleteVendorFailure(error));
  }
}

export function* getVendors() {
  try {
    const response = yield call(api.vendors.getVendors);

    yield put(actions.vendorActions.getVendorsSuccess(response.data));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.vendorActions.getVendorsFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_VENDOR, addVendor),
    takeEvery(types.DELETE_VENDOR, deleteVendor),
    takeEvery(types.GET_VENDORS, getVendors)
  ]);
}
