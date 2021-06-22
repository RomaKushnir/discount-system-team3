import { all } from 'redux-saga/effects';

import locationSagas from './locationSagas';
import vendorSagas from './vendorSagas';
import categorySagas from './categorySagas';

export default function* rootSaga() {
  yield all([
    vendorSagas(),
    locationSagas(),
    categorySagas()
  ]);
}
