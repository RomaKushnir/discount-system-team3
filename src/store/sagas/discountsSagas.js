import {
  put,
  call,
  takeEvery,
  all,
  select
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as api from '../../api';
import * as actions from '../actions';
import history from '../../history';
import { convertFilterParametersToUrl } from '../../utilities/discounts';

export const getDiscountsFiltersApplied = (state) => state.discountsReducer.discountsFiltersApplied;

export function* getDiscounts({ payload }) {
  try {
    console.log('SAGA', payload);
    const response = yield call(api.discounts.getDiscounts, payload.serverSearchParams);

    yield put(actions.discountsActions.getDiscountsListSuccess({
      discounts: response.data, showMore: payload.showMore
    }));
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

export function* applyDiscountsFilters({ payload }) {
  const discountsFiltersApplied = yield select(getDiscountsFiltersApplied);
  const searchParams = convertFilterParametersToUrl(discountsFiltersApplied);

  console.log(discountsFiltersApplied);

  const { queryParams, sortParams, paginationParams } = searchParams;

  console.log(searchParams);

  if (payload && payload.rewriteUrl !== false) {
    history.push({ pathname: '/discounts', search: `${queryParams}${sortParams}` });
  }

  const serverSearchParams = `${queryParams}${sortParams}${paginationParams}`;

  console.log(serverSearchParams);

  yield put(actions.discountsActions.getDiscountsList({ serverSearchParams, showMore: payload.showMore }));
}

export default function* watch() {
  yield all([
    takeEvery(types.GET_DISCOUNTS, getDiscounts),
    takeEvery(types.CREATE_DISCOUNT, createDiscount),
    takeEvery(types.DELETE_DISCOUNT, deleteDiscount),
    takeEvery(types.APPLY_DISCOUNTS_FILTERS, applyDiscountsFilters)
  ]);
}
