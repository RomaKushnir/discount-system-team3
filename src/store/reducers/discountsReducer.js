import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  discounts: [],
  getDiscountsStatus: helpers.getDefaultState()
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
      const { payload } = action;
      console.log('GET_DISCOUNTS_CLEAR_STATUS');
      console.log(state);
      return {
        ...state,
        getDiscountsStatus: helpers.getDefaultState(payload)
      };
    }
    default:
      return state;
  }
};

export default discountsReducer;
