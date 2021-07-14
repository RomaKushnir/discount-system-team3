import {
  put,
  call,
  takeEvery,
  all,
  select
} from 'redux-saga/effects';
import { toast } from 'react-toastify';
import * as types from '../actionTypes';
import * as api from '../../api';
import * as actions from '../actions';
import history from '../../history';
import { convertFilterParametersToUrl } from '../../utilities/discounts';

export const getDiscountsFiltersApplied = (state) => state.discountsReducer.discountsFiltersApplied;

export function* getDiscounts({ payload }) {
  try {
    const response = yield call(api.discounts.getDiscounts, payload.serverSearchParams);

    yield put(actions.discountsActions.getDiscountsListSuccess({
      discounts: response.data, showMore: payload.showMore
    }));
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
    toast.success('Discount was successfully saved.');
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

export function* applyDiscountsFilters({ payload }) {
  const discountsFiltersApplied = yield select(getDiscountsFiltersApplied);
  const searchParams = convertFilterParametersToUrl(discountsFiltersApplied);

  const { queryParams, sortParams, paginationParams } = searchParams;

  if (payload && payload.rewriteUrl !== false) {
    history.push({ pathname: '/discounts', search: `${queryParams}${sortParams}` });
  }

  const serverSearchParams = `${queryParams}${sortParams}${paginationParams}`;

  yield put(actions.discountsActions.getDiscountsList({ serverSearchParams, showMore: payload.showMore }));
}

export function* getVendorDiscounts({ payload }) {
  try {
    const today = new Date();
    const currentTime = today.toISOString().split('.')[0];

    const periodParams = payload.active ? `expirationDate>${currentTime};` : `expirationDate<${currentTime};`;
    const queryParams = `?query=vendor.id:${payload.vendorId};`;
    const paginationParams = `&page=${payload.pageNumber}&size=${payload.size}`;
    const searchParams = `${queryParams}${periodParams}${paginationParams}`;

    const response = yield call(api.discounts.getVendorDiscounts, searchParams);

    yield put(actions.discountsActions.getVendorDiscountsSuccess({
      discounts: response.data, showMore: payload.showMore
    }));
  } catch (error) {
    yield put(actions.discountsActions.getVendorDiscountsFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* activateDiscount({ payload }) {
  try {
    yield call(api.discounts.activateDiscount, payload);
    yield put(actions.discountsActions.activateDiscountSuccess(payload));
    toast.success('Discount was successfully activated.');
  } catch (error) {
    yield put(actions.discountsActions.activateDiscountFailure(error));
    toast.error(`Error: ${error.response.data.message}`);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_DISCOUNTS, getDiscounts),
    takeEvery(types.CREATE_DISCOUNT, createDiscount),
    takeEvery(types.DELETE_DISCOUNT, deleteDiscount),
    takeEvery(types.APPLY_DISCOUNTS_FILTERS, applyDiscountsFilters),
    takeEvery(types.GET_VENDOR_DISCOUNTS, getVendorDiscounts),
    takeEvery(types.ACTIVATE_DISCOUNT, activateDiscount)
  ]);
}
