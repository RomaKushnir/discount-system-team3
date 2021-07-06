import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as types from '../actionTypes';
import * as api from '../../api';
import * as actions from '../actions';

export function* getDiscounts() {
  try {
    const response = yield call(api.discounts.getDiscounts);

    yield put(actions.discountsActions.getDiscountsListSuccess(response.data.content));
  } catch (error) {
    yield put(actions.discountsActions.getDiscountsListFailure(error));
    toast.error(`Error: ${error.message}`);
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
    toast.success('Discount was successfully added/updated.');
  } catch (error) {
    yield put(actions.discountsActions.createDiscountFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* deleteDiscount({ payload }) {
  try {
    yield call(api.discounts.deleteDiscount, payload);
    yield put(actions.discountsActions.deleteDiscountSuccess(payload));
    toast.success('Category was successfully deleted.');
  } catch (error) {
    yield put(actions.discountsActions.deleteDiscountFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_DISCOUNTS, getDiscounts),
    takeEvery(types.CREATE_DISCOUNT, createDiscount),
    takeEvery(types.DELETE_DISCOUNT, deleteDiscount)
  ]);
}
