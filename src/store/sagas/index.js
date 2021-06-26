import { all } from 'redux-saga/effects';

import locationSagas from './locationSagas';
import vendorSagas from './vendorSagas';
import categorySagas from './categorySagas';
import userSagas from './userSagas';
import discountsSagas from './discountsSagas';

export default function* rootSaga() {
  yield all([
    vendorSagas(),
    locationSagas(),
    categorySagas(),
    userSagas(),
    discountsSagas()
  ]);
}
