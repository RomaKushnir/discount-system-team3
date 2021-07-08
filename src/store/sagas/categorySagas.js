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

  let response;

  try {
    if (id === '') {
      response = yield call(api.categories.addCategory, data);
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
    const updatedResponse = response.data.map((el) => ({
      ...el,
      tags: [
        { value: 'pizza', label: 'pizza' },
        { value: 'water', label: 'water' }
      ]
    }));
    yield put(actions.categoryActions.getCategoriesSuccess(updatedResponse));
  } catch (error) {
    yield put(actions.categoryActions.getCategoriesFailure(error));
  }
}

export function* deleteCategory({ payload }) {
  try {
    yield call(api.categories.deleteCategory, payload);

    yield put(actions.categoryActions.deleteCategorySuccess(payload));
  } catch (error) {
    yield put(actions.categoryActions.deleteCategoryFailure(error));
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_CATEGORY, addCategory),
    takeEvery(types.DELETE_CATEGORY, deleteCategory),
    takeEvery(types.GET_CATEGORIES, getCategories)
  ]);
}
