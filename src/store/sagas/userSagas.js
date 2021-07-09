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

export function* login({ payload }) {
  try {
    const response = yield call(api.user.login, payload);
    localStorage.setItem('token', response.data.token);
    yield put(actions.userActions.loginSuccess());
    yield put(actions.userActions.getUser());
  } catch (error) {
    yield put(actions.userActions.loginFailure(error.response.data));
    toast.error(`Error: ${error.response.data.code}`);
  }
}

export function* getUser() {
  try {
    const response = yield call(api.user.getUser);
    yield put(actions.userActions.getUserSuccess(response.data));
  } catch (error) {
    console.error(error);
    yield put(actions.userActions.getUserFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.LOGIN, login),
    takeEvery(types.GET_USER, getUser)
  ]);
}
