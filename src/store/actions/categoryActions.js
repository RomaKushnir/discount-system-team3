import * as types from '../actionTypes';

export function addCategory(payload) {
  return {
    type: types.ADD_CATEGORY,
    payload
  };
}

export function addCategorySuccess(payload) {
  return {
    type: types.ADD_CATEGORY_SUCCESS,
    payload
  };
}

export function addCategoryFailure(payload) {
  return {
    type: types.ADD_CATEGORY_FAILURE,
    payload
  };
}

export function updateCategorySuccess(payload) {
  return {
    type: types.UPDATE_CATEGORY_SUCCESS,
    payload
  };
}

export function clearAddCategoryStatus() {
  return {
    type: types.CLEAR_ADD_CATEGORY_STATUS
  };
}

export function getCategories() {
  return {
    type: types.GET_CATEGORIES
  };
}

export function getCategoriesSuccess(payload) {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    payload
  };
}

export function getCategoriesFailure(payload) {
  return {
    type: types.GET_CATEGORIES_FAILURE,
    payload
  };
}

export function clearGetCategoriesStatus() {
  return {
    type: types.CLEAR_GET_CATEGORIES_STATUS
  };
}

export function deleteCategory(payload) {
  return {
    type: types.DELETE_CATEGORY,
    payload
  };
}

export function deleteCategorySuccess(payload) {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
    payload
  };
}

export function deleteCategoryFailure(payload) {
  return {
    type: types.DELETE_CATEGORY_FAILURE,
    payload
  };
}

export function clearDeleteCategoryStatus() {
  return {
    type: types.CLEAR_DELETE_CATEGORY_STATUS
  };
}

export function addTagsToCategory(payload) {
  return {
    type: types.ADD_TAGS_TO_CATEGORY,
    payload
  };
}

export function addTagsToCategorySuccess(payload) {
  return {
    type: types.ADD_TAGS_TO_CATEGORY_SUCCESS,
    payload
  };
}

export function addTagsToCategoryFailure(payload) {
  return {
    type: types.ADD_TAGS_TO_CATEGORY_FAILURE,
    payload
  };
}

export function clearAddTagsToCategoryStatus() {
  return {
    type: types.CLEAR_ADD_TAGS_TO_CATEGORY_STATUS
  };
}

export function deleteTagsFromCategory(payload) {
  return {
    type: types.DELETE_TAGS_FROM_CATEGORY,
    payload
  };
}

export function deleteTagsFromCategorySuccess(payload) {
  return {
    type: types.DELETE_TAGS_FROM_CATEGORY_SUCCESS,
    payload
  };
}

export function deleteTagsFromCategoryFailure(payload) {
  return {
    type: types.DELETE_TAGS_FROM_CATEGORY_FAILURE,
    payload
  };
}

export function clearDeleteTagsFromCategoryStatus() {
  return {
    type: types.CLEAR_DELETE_TAGS_FROM_CATEGORY_STATUS
  };
}

export function createCategoryModalStatus(payload) {
  return {
    type: types.CREATE_CATEGORY_MODAL_STATUS,
    payload
  };
}
