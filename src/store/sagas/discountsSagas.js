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

    yield put(actions.discountsActions.getDiscountsListSuccess(response.data.content));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.discountsActions.getDiscountsListFailure(error));
  }
}

export function* createDiscount({ payload }) {
  // const { data } = payload;
  console.log('discounts SAGA payload', payload);
  try {
    console.log('SAGA createDiscount');
    const response = yield call(api.discounts.createDiscount, payload);

    yield put(actions.discountsActions.createDiscountSuccess(response.data));
  } catch (error) {
    console.error(error);
    console.log(error);
    console.log(error.response);
    console.log(error.request);
    console.log(error.config);
    yield put(actions.discountsActions.createDiscountFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_DISCOUNTS, getDiscounts),
    takeEvery(types.CREATE_DISCOUNT, createDiscount)
  ]);
}
