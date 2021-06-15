import { call, takeEvery, all } from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as services from '../../services';

export function* addVendor({ payload }) {
  console.log(payload);

  let response;

  try {
    if (payload.id === '') {
      response = yield call(services.vendorService.addVendor, payload);
    } else {
      response = yield call(services.vendorService.updateVendor, payload);
    }

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
