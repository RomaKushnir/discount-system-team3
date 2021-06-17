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
  let successMessage;

  try {
    if (id === '') {
      response = yield call(api.vendors.addVendor, data);
      successMessage = 'Vendor successfully added';
    } else {
      response = yield call(api.vendors.updateVendor, payload);
      successMessage = 'Vendor successfully updated';
    }

    console.log(response);
    console.log(successMessage);
    yield put(actions.vendorActions.addVendorSuccess(successMessage));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.vendorActions.addVendorFailure(error));
  }
}

export function* deleteVendor({ payload }) {
  try {
    const response = yield call(api.vendors.deleteVendor, payload);

    console.log(response);

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

    yield put(actions.vendorActions.getVendorsSuccess(response));
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
