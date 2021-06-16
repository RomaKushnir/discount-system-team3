import * as types from '../actionTypes';

const initialState = {
  vendors: []
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_VENDORS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        vendors: payload
      };
    }
    default:
      return state;
  }
};

export default vendorReducer;
