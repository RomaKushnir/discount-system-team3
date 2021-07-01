import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  discounts: [],
  getDiscountsStatus: helpers.getDefaultState(),
  createDiscountStatus: helpers.getDefaultState(),
  deleteDiscountStatus: helpers.getDefaultState()
};

const discountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DISCOUNTS: {
      console.log('GET_DISCOUNTS');
      console.log(state);
      return {
        ...state,
        getDiscountsStatus: helpers.getRequestState()
      };
    }
    case types.GET_DISCOUNTS_SUCCESS: {
      const { payload } = action;
      console.log('GET_DISCOUNTS_SUCCESS');
      console.log(state);
      return {
        ...state,
        discounts: payload,
        getDiscountsStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_DISCOUNTS_FAILURE: {
      const { payload } = action;
      console.log('GET_DISCOUNTS_FAILURE');
      console.log(state);
      return {
        ...state,
        getDiscountsStatus: helpers.getErrorState(payload)
      };
    }
    case types.GET_DISCOUNTS_CLEAR_STATUS: {
      console.log('GET_DISCOUNTS_CLEAR_STATUS');
      console.log(state);
      return {
        ...state,
        getDiscountsStatus: helpers.getDefaultState()
      };
    }
    case types.CREATE_DISCOUNT: {
      return {
        ...state,
        createDiscountStatus: helpers.getRequestState()
      };
    }
    case types.CREATE_DISCOUNT_SUCCESS: {
      const successMessage = 'Discount is successfully submitted';
      return {
        ...state,
        createDiscountStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.CREATE_DISCOUNT_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        createDiscountStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_CREATE_DISCOUNT_STATUS: {
      return {
        ...state,
        createDiscountStatus: helpers.getDefaultState()
      };
    }
    case types.DELETE_DISCOUNT: {
      console.log('DELETE_DISCOUNT');
      return {
        ...state,
        deleteDiscountStatus: helpers.getRequestState()
      };
    }
    case types.DELETE_DISCOUNT_SUCCESS: {
      const { payload } = action;
      const updatedDiscounts = state.discounts.filter((el) => el.id !== payload);
      const successMessage = 'Discount successfully deleted';
      return {
        ...state,
        discounts: updatedDiscounts,
        deleteDiscountStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.DELETE_DISCOUNT_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        deleteDiscountStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_DELETE_DISCOUNT_STATUS: {
      return {
        ...state,
        deleteDiscountStatus: helpers.getDefaultState()
      };
    }
    default:
      return state;
  }
};

export default discountsReducer;
