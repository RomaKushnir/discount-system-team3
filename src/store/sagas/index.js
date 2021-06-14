import { all } from 'redux-saga/effects';

import locationSagas from './locationSagas';
import vendorSagas from './vendorSagas';

export default function* rootSaga() {
  yield all([
    vendorSagas(),
    locationSagas()
  ]);
}
