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
    id, title, tags, deletedTags
  } = payload;

  console.log(payload);
  console.log(id, title, tags, deletedTags);

  let response;

  try {
    if (id === '') {
      response = yield call(api.categories.addCategory, { title });
      yield put(actions.categoryActions.addCategorySuccess(response.data));
    } else {
      response = yield call(api.categories.updateCategory, { id, title });
      yield put(actions.categoryActions.updateCategorySuccess(response.data));
    }
    toast.success('Category was successfully saved.');
    if (tags?.length > 0) {
      const tagsAddingResponse = yield call(api.categories.addTagsToCategory, { categoryId: id, tags });

      console.log(tagsAddingResponse);
      yield put(actions.categoryActions.addTagsToCategorySuccess(tagsAddingResponse.data));
    }
    if (deletedTags?.length > 0) {
      const tagsDeletingResponse = yield call(api.categories.addTagsToCategory, { categoryId: id, tags: deletedTags });
      console.log(tagsDeletingResponse);
      yield put(actions.categoryActions.deleteTagsFromCategorySuccess(tagsDeletingResponse.data));
    }
  } catch (error) {
    yield put(actions.categoryActions.addCategoryFailure(error));
    toast.error(`Error: ${error.message}`);
  }
}

export function* getCategories() {
  try {
    const response = yield call(api.categories.getCategories);

    console.log(response);
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
  } catch (error) {
    yield put(actions.categoryActions.deleteCategoryFailure(error));
  }
}

export function* addTagsToCategory({ payload }) {
  console.log(payload);
  const { id, tags } = payload;

  try {
    const response = yield call(api.categories.addTagsToCategory, { categoryId: id, tags });

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
  const { id, tags } = payload;

  try {
    const response = yield call(api.categories.deleteTagsFromCategory, { categoryId: id, tags });

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
