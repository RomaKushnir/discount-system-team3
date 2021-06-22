import * as types from '../actionTypes';
import categoryReducer from './categoryReducer';
import * as helpers from '../helpers';

describe('CategoryReducer', () => {
  test('should return the initial state', () => {
    expect(categoryReducer(undefined, { type: undefined })).toEqual({
      categories: [],
      addCategoryStatus: helpers.getDefaultState()
    });
  });
  test('should handle ADD_CATEGORY', () => {
    expect(categoryReducer(
      {
        categories: [],
        addCategoryStatus: helpers.getRequestState()
      },
      { type: types.ADD_CATEGORY }
    )).toEqual(
      {
        categories: [],
        addCategoryStatus: helpers.getRequestState()
      }
    );
  });
  test('should handle ADD_CATEGORY_SUCCESS', () => {
    const payload = 'Action successful!';
    expect(categoryReducer(
      {
        categories: [],
        addCategoryStatus: helpers.getRequestState()
      },
      {
        type: types.ADD_CATEGORY_SUCCESS,
        payload
      }
    )).toEqual(
      {
        categories: [],
        addCategoryStatus: helpers.getSuccessState(payload)
      }
    );
  });
  test('should handle ADD_CATEGORY_FAILURE', () => {
    const payload = 'Not found';
    expect(categoryReducer(
      {
        categories: [],
        addCategoryStatus: helpers.getRequestState()
      },
      {
        type: types.ADD_CATEGORY_FAILURE,
        payload
      }
    )).toEqual(
      {
        categories: [],
        addCategoryStatus: helpers.getErrorState(payload)
      }
    );
  });
  test('should handle CLEAR_ADD_CATEGORY_STATUS', () => {
    expect(categoryReducer(
      {
        categories: [],
        addCategoryStatus: helpers.getRequestState()
      },
      {
        type: types.CLEAR_ADD_CATEGORY_STATUS
      }
    )).toEqual(
      {
        categories: [],
        addCategoryStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle UPDATE_CATEGORY_SUCCESS', () => {
    const payload = {
      imageUrl: 'https://picsum.photos/200?random=11',
      title: 'Sport equipment',
      id: 5
    };
    const successMessage = 'Action successful!';
    expect(categoryReducer(
      {
        categories:
        [
          {
            imageUrl: 'https://picsum.photos/200?random=10',
            title: 'Sport',
            id: 5
          },
          {
            imageUrl: 'https://picsum.photos/200?random=8',
            title: 'Food',
            id: 8
          }
        ],
        addCategoryStatus: helpers.getRequestState()
      },
      {
        type: types.UPDATE_CATEGORY_SUCCESS,
        payload
      }
    )).toEqual(
      {
        categories:
        [
          payload,
          {
            imageUrl: 'https://picsum.photos/200?random=8',
            title: 'Food',
            id: 8
          }
        ],
        addCategoryStatus: helpers.getSuccessState(successMessage)
      }
    );
  });
});
