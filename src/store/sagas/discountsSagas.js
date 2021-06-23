import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as api from '../../api';
import * as actions from '../actions';

export function* getDiscounts() {
  console.log('discounts saga');
  try {
    const response = yield call(api.discounts.getDiscounts);
    console.log(response);

    yield put(actions.discountsActions.getDiscountsListSuccess(response.data));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.discountsActions.getDiscountsListFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_DISCOUNTS, getDiscounts)
  ]);
}
