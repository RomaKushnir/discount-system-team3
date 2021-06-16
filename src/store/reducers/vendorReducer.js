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
        vendors: payload.data
      };
    }
    case types.UPDATE_VENDOR_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        vendors: payload
      };
    }
    case types.DELETE_VENDOR_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        vendors: state.vendors.filter((el) => el.id !== payload)
      };
    }
    default:
      return state;
  }
};

export default vendorReducer;
