import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  vendors: [],
  getVendorsStatus: helpers.getDefaultState(),
  addVendorStatus: helpers.getDefaultState(),
  deleteVendorStatus: helpers.getDefaultState()
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_VENDORS: {
      console.log('GET_VENDORS');
      console.log(state);
      return {
        ...state,
        getVendorsStatus: helpers.getRequestState()
      };
    }
    case types.GET_VENDORS_SUCCESS: {
      const { payload } = action;
      console.log('GET_VENDORS_SUCCESS');
      console.log(state);
      return {
        ...state,
        vendors: payload,
        getVendorsStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_VENDORS_FAILURE: {
      const { payload } = action;
      console.log('GET_VENDORS_FAILURE');
      console.log(state);
      return {
        ...state,
        getVendorsStatus: helpers.getErrorState(payload)
      };
    }
    case types.ADD_VENDOR: {
      console.log('ADD_VENDOR');
      console.log(state);
      return {
        ...state,
        addVendorStatus: helpers.getRequestState()
      };
    }
    case types.ADD_VENDOR_SUCCESS: {
      const { payload } = action;
      console.log('ADD_VENDOR_SUCCESS');
      console.log(state);
      return {
        ...state,
        addVendorStatus: helpers.getSuccessState(payload)
      };
    }
    case types.ADD_VENDOR_FAILURE: {
      const { payload } = action;
      console.log('ADD_VENDOR_FAILURE');
      console.log(state);
      return {
        ...state,
        addVendorStatus: helpers.getErrorState(payload)
      };
    }
    case types.ADD_VENDOR_CLEAR_STATUS: {
      console.log('ADD_VENDOR_CLEAR_STATUS');
      console.log(state);
      return {
        ...state,
        addVendorStatus: helpers.getDefaultState()
      };
    }
    case types.DELETE_VENDOR: {
      return {
        ...state,
        deleteVendorStatus: helpers.getRequestState()
      };
    }
    case types.DELETE_VENDOR_SUCCESS: {
      const { payload } = action;
      console.log(payload);
      const updatedVendors = state.vendors.filter((el) => el.id !== payload);
      console.log(updatedVendors);
      const successMessage = 'Vendor successfully deleted';
      return {
        ...state,
        vendors: updatedVendors,
        deleteVendorStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.DELETE_VENDOR_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        deleteVendorStatus: helpers.getErrorState(payload)
      };
    }
    default:
      return state;
  }
};

export default vendorReducer;
