import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as types from '../actionTypes';
import * as api from '../../api';
import * as actions from '../actions';

export function* addCategory({ payload }) {
  const { id, ...data } = payload;
  console.log(payload);

  let response;

  try {
    if (id === '') {
      response = yield call(api.categories.addCategory, data);
      console.log(response);
      yield put(actions.categoryActions.addCategorySuccess(response.data));
    } else {
      response = yield call(api.categories.updateCategory, payload);
      yield put(actions.categoryActions.updateCategorySuccess(response.data));
    }
  } catch (error) {
    yield put(actions.categoryActions.addCategoryFailure(error));
  }
}

export function* getCategories() {
  try {
    const response = yield call(api.categories.getCategories);
    yield put(actions.categoryActions.getCategoriesSuccess(response.data));
  } catch (error) {
    console.error(error);
    console.log(error);
    yield put(actions.categoryActions.getCategoriesFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_CATEGORY, addCategory),
    takeEvery(types.GET_CATEGORIES, getCategories)
  ]);
}
