import { call, takeEvery, all } from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as services from '../../services';

export function* addVendor({ payload }) {
  console.log(payload);

  try {
    const response = yield call(services.vendorService.addVendor, payload);

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_VENDOR, addVendor)
  ]);
}
