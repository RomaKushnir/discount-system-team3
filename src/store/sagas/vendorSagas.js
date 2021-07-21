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
import { convertFilterParametersToUrl } from '../../utilities/vendors';
import history from '../../history';

export const getVendorsFiltersApplied = (state) => state.vendorReducer.vendorsFiltersApplied;

export function* addVendor({ payload }) {
  const { id, ...data } = payload;
  let response;

  try {
    if (id === undefined) {
      response = yield call(api.vendors.addVendor, data);
      yield put(actions.vendorActions.addVendorSuccess(response.data));
    } else {
      response = yield call(api.vendors.updateVendor, payload);
      yield put(actions.vendorActions.updateVendorSuccess(response.data));
    }
    yield put(actions.vendorActions.updateVendorsFilters({ pageNumber: 0 }));
    yield put(actions.vendorActions.clearAddVendorStatus());
    yield put(actions.vendorActions.applyVendorsFilters(
      {
        showMore: false,
        rewriteUrl: false
      }
    ));
    yield put(actions.vendorActions.addVendorModalStatus(false));
    toast.success('Vendor was successfully saved.');
  } catch (error) {
    yield put(actions.vendorActions.addVendorFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* deleteVendor({ payload }) {
  try {
    yield call(api.vendors.deleteVendor, payload);

    yield put(actions.vendorActions.deleteVendorSuccess(payload));
    toast.success('Vendor was successfully deleted.');
  } catch (error) {
    yield put(actions.vendorActions.deleteVendorFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getVendors({ payload }) {
  try {
    const response = yield call(api.vendors.getVendors, payload.serverSearchParams);

    yield put(actions.vendorActions.getVendorsSuccess({ vendors: response.data, showMore: payload.showMore }));
  } catch (error) {
    yield put(actions.vendorActions.getVendorsFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getVendorById({ payload }) {
  try {
    const response = yield call(api.vendors.getVendorById, payload);
    yield put(actions.vendorActions.getVendorByIdSuccess(response.data));
  } catch (error) {
    yield put(actions.vendorActions.getVendorByIdFailure(error));
    toast.error(`Error: ${error.message}`);
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
    yield put(actions.vendorActions.getTypeaheadVendorsFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getSubscribedVendors() {
  try {
    const response = yield call(api.vendors.getSubscribedVendors);
    yield put(actions.vendorActions.getSubscribedVendorsSuccess(response.data));
  } catch (error) {
    yield put(actions.vendorActions.getSubscribedVendorsFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* vendorSubscribe({ payload }) {
  try {
    yield call(api.vendors.vendorSubscribe, payload);

    const msg = 'You have been successfully subscribed';
    yield put(actions.vendorActions.vendorSubscribeSuccess(payload));
    toast.success(msg);
  } catch (error) {
    yield put(actions.vendorActions.vendorSubscribeFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* vendorUnsubscribe({ payload }) {
  try {
    yield call(api.vendors.vendorUnsubscribe, payload);

    const msg = 'You have been unsubscribed';
    yield put(actions.vendorActions.vendorUnsubscribeSuccess(payload));
    toast.success(msg);
  } catch (error) {
    yield put(actions.vendorActions.vendorUnsubscribeFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_VENDOR, addVendor),
    takeEvery(types.DELETE_VENDOR, deleteVendor),
    takeEvery(types.GET_VENDORS, getVendors),
    takeEvery(types.GET_VENDOR_BY_ID, getVendorById),
    takeEvery(types.APPLY_VENDORS_FILTERS, applyVendorsFilters),
    takeEvery(types.GET_TYPEAHEAD_VENDORS, getTypeaheadVendors),
    takeEvery(types.GET_SUBSCRIBED_VENDORS, getSubscribedVendors),
    takeEvery(types.VENDOR_SUBSCRIBE, vendorSubscribe),
    takeEvery(types.VENDOR_UNSUBSCRIBE, vendorUnsubscribe)
  ]);
}
