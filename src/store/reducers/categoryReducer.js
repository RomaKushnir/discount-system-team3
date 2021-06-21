import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  categories: [],
  addCategoryStatus: helpers.getDefaultState()
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CATEGORY: {
      console.log('ADD_CATEGORY');
      console.log(state);
      return {
        ...state,
        addCategoryStatus: helpers.getRequestState()
      };
    }
    case types.ADD_CATEGORY_SUCCESS: {
      console.log('ADD_CATEGORY_SUCCESS');
      console.log(state);
      const successMessage = 'Action successful!';
      return {
        ...state,
        addCategoryStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.ADD_CATEGORY_FAILURE: {
      const { payload } = action;
      console.log('ADD_CATEGORY_FAILURE');
      console.log(state);
      return {
        ...state,
        addCategoryStatus: helpers.getErrorState(payload)
      };
    }
    case types.ADD_CATEGORY_CLEAR_STATUS: {
      console.log('ADD_CATEGORY_CLEAR_STATUS');
      console.log(state);
      return {
        ...state,
        addCategoryStatus: helpers.getDefaultState()
      };
    }
    case types.UPDATE_CATEGORY_SUCCESS: {
      const { payload } = action;
      console.log(payload);
      const successMessage = 'Action successful!';
      const updateCategories = state.categories.map(
        (el) => {
          if (el.id === payload.id) {
            return payload;
          }
          return el;
        }
      );
      return {
        ...state,
        addCategoryStatus: helpers.getSuccessState(successMessage),
        categories: updateCategories
      };
    }
    default:
      return state;
  }
};

export default categoryReducer;
