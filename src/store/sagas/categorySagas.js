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
    toast.success('Category was successfully saved.');
  } catch (error) {
    yield put(actions.categoryActions.addCategoryFailure(error));
    toast.error(`Error: ${error.message}`);
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
    toast.error(`Error: ${error.message}`);
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

export function* addTagsToCategory({ payload }) {
  console.log(payload);

  try {
    const response = yield call(api.categories.addTagsToCategory, payload);

    console.log(response);
    yield put(actions.categoryActions.addTagsToCategorySuccess(response.data));

    toast.success('Tags were successfully saved.');
  } catch (error) {
    yield put(actions.categoryActions.addTagsToCategoryFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* deleteTagsFromCategory({ payload }) {
  console.log(payload);

  try {
    const response = yield call(api.categories.deleteTagsFromCategory, payload);

    console.log(response);
    yield put(actions.categoryActions.deleteTagsFromCategorySuccess(response.data));

    toast.success('Tags were successfully deleted.');
  } catch (error) {
    yield put(actions.categoryActions.deleteTagsFromCategoryFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export default function* watch() {
  yield all([
    takeEvery(types.ADD_CATEGORY, addCategory),
    takeEvery(types.DELETE_CATEGORY, deleteCategory),
    takeEvery(types.GET_CATEGORIES, getCategories),
    takeEvery(types.ADD_TAGS_TO_CATEGORY, addTagsToCategory),
    takeEvery(types.DELETE_TAGS_FROM_CATEGORY, deleteTagsFromCategory)
  ]);
}
