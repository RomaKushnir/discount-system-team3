import { call, takeEvery, all } from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as services from '../../services';

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

export default function* watch() {
  yield all([
    takeEvery(types.ADD_VENDOR, addVendor)
  ]);
}
