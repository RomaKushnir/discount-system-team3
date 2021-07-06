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
  console.log(payload);

  try {
    const response = yield call(api.user.login, payload);
    localStorage.setItem('token', response.data.token);
    yield put(actions.userActions.loginSuccess());
  } catch (error) {
    yield put(actions.userActions.loginFailure(error.response.data));
    toast.error(`Error: ${error.response.data.code}`);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.LOGIN, login)
  ]);
}
