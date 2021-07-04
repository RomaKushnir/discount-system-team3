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
import { convertFilterParametersToUrl } from '../../utilities/vendors';
import history from '../../history';

export const getVendorsFiltersApplied = (state) => state.vendorReducer.vendorsFiltersApplied;

export function* addVendor({ payload }) {
  const { id, ...data } = payload;

  let response;

  try {
    if (id === '') {
      response = yield call(api.vendors.addVendor, data);
      yield put(actions.vendorActions.addVendorSuccess(response.data));
    } else {
      response = yield call(api.vendors.updateVendor, payload);
      yield put(actions.vendorActions.updateVendorSuccess(response.data));
    }
  } catch (error) {
    console.error(error);
    console.log(error);
    console.log(error.response);
    console.log(error.request);
    console.log(error.config);
    yield put(actions.vendorActions.addVendorFailure(error));
  }
}

export function* deleteVendor({ payload }) {
  try {
    yield call(api.vendors.deleteVendor, payload);

    yield put(actions.vendorActions.deleteVendorSuccess(payload));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.vendorActions.deleteVendorFailure(error));
  }
}

export function* getVendors({ payload }) {
  try {
    const response = yield call(api.vendors.getVendors, payload.serverSearchParams);

    yield put(actions.vendorActions.getVendorsSuccess({ vendors: response.data, showMore: payload.showMore }));
  } catch (error) {
    console.error(error);
    yield put(actions.vendorActions.getVendorsFailure(error));
  }
}

export function* getVendorById({ payload }) {
  console.log(payload);
  try {
    const response = yield call(api.vendors.getVendorById, payload);
    console.log(response);
    yield put(actions.vendorActions.getVendorByIdSuccess(response.data));
  } catch (error) {
    console.error(error);
    yield put(actions.vendorActions.getVendorByIdFailure(error));
  }
}

export function* applyVendorsFilters({ payload }) {
  const vendorsFiltersApplied = yield select(getVendorsFiltersApplied);
  const searchParams = convertFilterParametersToUrl(vendorsFiltersApplied);

  const { queryParams, sortParams, paginationParams } = searchParams;

  if (payload && payload.rewriteUrl !== false) {
    history.push({ pathname: '/vendors', search: `${queryParams}${sortParams}` });
  }

  const serverSearchParams = `${queryParams}${sortParams}${paginationParams}`;

  yield put(actions.vendorActions.getVendors({ serverSearchParams, showMore: payload.showMore }));
}

export function* getTypeaheadVendors({ payload }) {
  const minSearchNumber = 3;
  try {
    if (payload.length >= minSearchNumber) {
      const searchParams = `?query=title*:*${payload}`;
      const response = yield call(api.vendors.getVendors, searchParams);

      yield put(actions.vendorActions.getTypeaheadVendorsSuccess(response.data.content));
    }
  } catch (error) {
    console.error(error);
    yield put(actions.vendorActions.getTypeaheadVendorsFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_VENDOR, addVendor),
    takeEvery(types.DELETE_VENDOR, deleteVendor),
    takeEvery(types.GET_VENDORS, getVendors),
    takeEvery(types.GET_VENDOR_BY_ID, getVendorById),
    takeEvery(types.APPLY_VENDORS_FILTERS, applyVendorsFilters),
    takeEvery(types.GET_TYPEAHEAD_VENDORS, getTypeaheadVendors)
  ]);
}
