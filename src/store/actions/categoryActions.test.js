import * as actions from './categoryActions';
import * as types from '../actionTypes';

describe('Category actions', () => {
  test('should create an action to trigger creation of category', () => {
    const payload = {
      imageUrl: 'https://picsum.photos/200?random=5',
      title: 'Sport'
    };
    const expectedAction = {
      type: types.ADD_CATEGORY,
      payload
    };
    expect(actions.addCategory(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger creation of category success', () => {
    const payload = {
      imageUrl: 'https://picsum.photos/200?random=5',
      title: 'Sport',
      id: 11
    };
    const expectedAction = {
      type: types.ADD_CATEGORY_SUCCESS,
      payload
    };
    expect(actions.addCategorySuccess(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger creation of category failure', () => {
    const payload = 'Not found';
    const expectedAction = {
      type: types.ADD_CATEGORY_FAILURE,
      payload
    };
    expect(actions.addCategoryFailure(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger update of category success', () => {
    const payload = {
      imageUrl: 'https://picsum.photos/200?random=8',
      title: 'Food',
      id: 5
    };
    const expectedAction = {
      type: types.UPDATE_CATEGORY_SUCCESS,
      payload
    };
    expect(actions.updateCategorySuccess(payload)).toEqual(expectedAction);
  });
  test('should create an action to clear add category status', () => {
    const expectedAction = {
      type: types.CLEAR_ADD_CATEGORY_STATUS
    };
    expect(actions.clearAddCategoryStatus()).toEqual(expectedAction);
  });
});
