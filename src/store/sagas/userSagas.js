import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as api from '../../api';
import * as actions from '../actions';

export function* login({ payload }) {
  console.log(payload);

  try {
    const response = yield call(api.user.login, payload);
    console.log(response);
    console.log(response.data);
    localStorage.setItem('token', response.data);
    yield put(actions.userActions.loginSuccess());
  } catch (error) {
    console.error(error);
    console.log(error);
    console.log(error.response);
    console.log(error.request);
    console.log(error.config);
    yield put(actions.userActions.loginFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.LOGIN, login)
  ]);
}
