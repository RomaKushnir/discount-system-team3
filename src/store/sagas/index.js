import { all } from 'redux-saga/effects';

import locationSagas from './locationSagas';
import vendorSagas from './vendorSagas';
import categorySagas from './categorySagas';
import discountsSagas from './discountsSagas';

export default function* rootSaga() {
  yield all([
    vendorSagas(),
    locationSagas(),
    categorySagas(),
    discountsSagas()
  ]);
}
