import * as types from '../actionTypes';
import * as helpers from '../helpers';

export const defaultVendorsFilter = {
  country: 'Ukraine', // temporary, should be user country
  city: null,
  // categoryId: null,
  title: null,
  description: null,
  sort: 'ASC',
  pageNumber: 0,
  size: 6,
  totalElements: null,
  totalPages: null
};

const initialState = {
  vendors: [],
  getVendorsStatus: helpers.getDefaultState(),
  addVendorStatus: helpers.getDefaultState(),
  deleteVendorStatus: helpers.getDefaultState(),
  updateVendorStatus: helpers.getDefaultState(),
  vendor: null,
  vendorStatus: helpers.getDefaultState(),
  vendorsFilters: { ...defaultVendorsFilter },
  vendorsFiltersApplied: { ...defaultVendorsFilter }
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_VENDORS: {
      console.log('GET VENDORS');
      console.log(defaultVendorsFilter);
      return {
        ...state,
        getVendorsStatus: helpers.getRequestState()
      };
    }
    case types.GET_VENDORS_SUCCESS: {
      const {
        vendors, showMore
      } = action.payload;
      const {
        content, number, size, totalElements, totalPages
      } = vendors;

      console.log(action.payload);
      return {
        ...state,
        vendors: showMore ? [...state.vendors, ...content] : content,
        getVendorsStatus: helpers.getSuccessState('Success!'),
        vendorsFiltersApplied: {
          ...state.vendorsFiltersApplied,
          pageNumber: number,
          size,
          totalElements,
          totalPages
        }
      };
    }
    case types.GET_VENDORS_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getVendorsStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_VENDORS_STATUS: {
      console.log('CLEAR STATUS');
      console.log(defaultVendorsFilter);
      return {
        ...state,
        getVendorsStatus: helpers.getDefaultState(),
        vendorsFilters: {
          ...state.vendorsFilters,
          pageNumber: 0,
          size: 6
        }
      };
    }
    case types.ADD_VENDOR: {
      return {
        ...state,
        addVendorStatus: helpers.getRequestState()
      };
    }
    case types.ADD_VENDOR_SUCCESS: {
      const successMessage = 'Action successful!';
      return {
        ...state,
        addVendorStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.ADD_VENDOR_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        addVendorStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_ADD_VENDOR_STATUS: {
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
    case types.CLEAR_DELETE_VENDOR_STATUS: {
      return {
        ...state,
        deleteVendorStatus: helpers.getDefaultState()
      };
    }
    case types.UPDATE_VENDOR_SUCCESS: {
      const { payload } = action;
      console.log(payload);
      const successMessage = 'Action successful!';
      const updateVendors = state.vendors.map(
        (el) => {
          if (el.id === payload.id) {
            return payload;
          }
          return el;
        }
      );
      return {
        ...state,
        addVendorStatus: helpers.getSuccessState(successMessage),
        vendors: updateVendors
      };
    }
    case types.GET_VENDOR_BY_ID: {
      return {
        ...state,
        vendorStatus: helpers.getRequestState()
      };
    }
    case types.GET_VENDOR_BY_ID_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        vendorStatus: helpers.getSuccessState('Action success'),
        vendor: payload
      };
    }
    case types.GET_VENDOR_BY_ID_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        vendorStatus: helpers.getErrorState(payload)
      };
    }
    case types.GET_VENDOR_BY_ID_CLEAR_STATUS: {
      return {
        ...state,
        vendorStatus: helpers.getDefaultState()
      };
    }
    case types.UPDATE_VENDORS_FILTERS: {
      const { payload } = action;
      console.log(payload);
      return {
        ...state,
        vendorsFilters: { ...state.vendorsFilters, ...payload }
      };
    }
    case types.APPLY_VENDORS_FILTERS: {
      const { payload } = action;
      console.log(payload);
      console.log(state.vendorsFiltersApplied);
      console.log(state.vendorsFilters);
      return {
        ...state,
        vendorsFiltersApplied: { ...state.vendorsFiltersApplied, ...state.vendorsFilters }
      };
    }
    default:
      return state;
  }
};

export default vendorReducer;
