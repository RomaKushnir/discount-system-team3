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
  const {
    id, title, tags
  } = payload;

  let response;

  try {
    if (id === '') {
      response = yield call(api.categories.addCategory, { title });
      yield put(actions.categoryActions.addCategorySuccess(response.data));
    } else {
      response = yield call(api.categories.updateCategory, { id, title });
      yield put(actions.categoryActions.updateCategorySuccess(response.data));
    }
    if (tags?.length > 0) {
      const tagsAddingResponse = yield call(api.categories.addTagsToCategory, {
        categoryId: id || response.data.id, tags
      });

      yield put(actions.categoryActions.addTagsToCategorySuccess(tagsAddingResponse.data));
    }
    yield put(actions.categoryActions.getCategories());
    yield put(actions.categoryActions.clearAddCategoryStatus());
    yield put(actions.categoryActions.createCategoryModalStatus(false));
    toast.success('Category was successfully saved.');
  } catch (error) {
    yield put(actions.categoryActions.addCategoryFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getCategories() {
  try {
    const response = yield call(api.categories.getCategories);

    yield put(actions.categoryActions.getCategoriesSuccess(response.data));
  } catch (error) {
    yield put(actions.categoryActions.getCategoriesFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* deleteCategory({ payload }) {
  try {
    yield call(api.categories.deleteCategory, payload);

    yield put(actions.categoryActions.deleteCategorySuccess(payload));
    yield put(actions.categoryActions.getCategories());
    toast.success('Category was successfully deleted.');
  } catch (error) {
    yield put(actions.categoryActions.deleteCategoryFailure(error));
    toast.error(`Error: ${error.response.data.message}`);
  }
}

export function* addTagsToCategory({ payload }) {
  const { id, tags } = payload;

  try {
    const response = yield call(api.categories.addTagsToCategory, { categoryId: id, tags });

    yield put(actions.categoryActions.addTagsToCategorySuccess(response.data));
    yield put(actions.categoryActions.getCategories());
    yield put(actions.categoryActions.clearAddCategoryStatus());
    yield put(actions.categoryActions.createCategoryModalStatus(false));
    toast.success('Category was successfully saved.');
  } catch (error) {
    yield put(actions.categoryActions.addTagsToCategoryFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* deleteTagsFromCategory({ payload }) {
  const { id, tags } = payload;

  try {
    const response = yield call(api.categories.deleteTagsFromCategory, { categoryId: id, tags });

    yield put(actions.categoryActions.deleteTagsFromCategorySuccess(response.data));
    yield put(actions.categoryActions.getCategories());
    yield put(actions.categoryActions.clearAddCategoryStatus());
    yield put(actions.categoryActions.createCategoryModalStatus(false));
    toast.success('Tags were successfully deleted.');
  } catch (error) {
    yield put(actions.categoryActions.deleteTagsFromCategoryFailure(error.response.data));
    toast.error(`Error: ${error.response.data.message}`);
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
