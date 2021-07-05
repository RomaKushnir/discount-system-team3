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
  try {
    const response = yield call(api.discounts.getDiscounts);

    yield put(actions.discountsActions.getDiscountsListSuccess(response.data.content));
  } catch (error) {
    yield put(actions.discountsActions.getDiscountsListFailure(error));
  }
}

export function* createDiscount({ payload }) {
  const { id, ...data } = payload;
  let response;
  try {
    if (!id) {
      response = yield call(api.discounts.createDiscount, data);
    } else {
      response = yield call(api.discounts.updateDiscount, payload);
    }
    yield put(actions.discountsActions.createDiscountSuccess(response.data));
  } catch (error) {
    yield put(actions.discountsActions.createDiscountFailure(error));
  }
}

export function* deleteDiscount({ payload }) {
  try {
    yield call(api.discounts.deleteDiscount, payload);
    yield put(actions.discountsActions.deleteDiscountSuccess(payload));
  } catch (error) {
    yield put(actions.discountsActions.deleteDiscountFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_DISCOUNTS, getDiscounts),
    takeEvery(types.CREATE_DISCOUNT, createDiscount),
    takeEvery(types.DELETE_DISCOUNT, deleteDiscount)
  ]);
}
