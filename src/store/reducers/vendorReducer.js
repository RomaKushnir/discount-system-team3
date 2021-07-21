import * as types from '../actionTypes';
import * as helpers from '../helpers';

export const defaultVendorsFilter = {
  country: null,
  city: null,
  category: null,
  vendorTitle: '',
  description: '',
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
  vendorsFiltersApplied: { ...defaultVendorsFilter },
  vendorsTypeahead: [],
  getTypeaheadVendorsStatus: helpers.getDefaultState(),
  addVendorModalStatus: false,
  subscribedVendors: [],
  subscribedVendorsStatus: helpers.getDefaultState(),
  vendorSubscribeStatus: helpers.getDefaultState(),
  vendorUnsubscribeStatus: helpers.getDefaultState()
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_VENDORS: {
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
      return {
        ...state,
        getVendorsStatus: helpers.getDefaultState(),
        vendorsFilters: {
          ...state.vendorsFilters,
          pageNumber: defaultVendorsFilter.pageNumber,
          size: defaultVendorsFilter.size
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
      const updatedVendors = state.vendors.filter((el) => el.id !== payload);
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
        vendorStatus: helpers.getSuccessState('Action successful'),
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
      return {
        ...state,
        vendorsFilters: { ...state.vendorsFilters, ...payload }
      };
    }
    case types.APPLY_VENDORS_FILTERS: {
      return {
        ...state,
        vendorsFiltersApplied: { ...state.vendorsFiltersApplied, ...state.vendorsFilters }
      };
    }
    case types.GET_TYPEAHEAD_VENDORS: {
      return {
        ...state,
        getTypeaheadVendorsStatus: helpers.getRequestState()
      };
    }
    case types.GET_TYPEAHEAD_VENDORS_SUCCESS: {
      return {
        ...state,
        vendorsTypeahead: action.payload,
        getTypeaheadVendorsStatus: helpers.getSuccessState('Action successful')
      };
    }
    case types.GET_TYPEAHEAD_VENDORS_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getTypeaheadVendorsStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_VENDORS_TYPEAHEAD: {
      return {
        ...state,
        getTypeaheadVendorsStatus: helpers.getDefaultState(),
        vendorsTypeahead: []
      };
    }
    case types.CLEAR_VENDORS_FILTERS: {
      return {
        ...state,
        vendorsFilters: { ...defaultVendorsFilter }
      };
    }
    case types.ADD_VENDOR_MODAL_STATUS: {
      return {
        ...state,
        addVendorModalStatus: action.payload
      };
    }

    case types.GET_SUBSCRIBED_VENDORS: {
      return {
        ...state,
        subscribedVendorsStatus: helpers.getRequestState()
      };
    }
    case types.GET_SUBSCRIBED_VENDORS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        subscribedVendors: payload,
        subscribedVendorsStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_SUBSCRIBED_VENDORS_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        subscribedVendorsStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_SUBSCRIBED_VENDORS_STATUS: {
      return {
        ...state,
        subscribedVendorsStatus: helpers.getDefaultState()
      };
    }
    case types.VENDOR_SUBSCRIBE: {
      return {
        ...state,
        vendorSubscribeStatus: helpers.getRequestState()
      };
    }
    case types.VENDOR_SUBSCRIBE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        subscribedVendors: [...state.subscribedVendors, payload],
        vendorSubscribeStatus: helpers.getSuccessState(payload)
      };
    }
    case types.VENDOR_SUBSCRIBE_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        vendorSubscribeStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_VENDOR_SUBSCRIBE_STATUS: {
      return {
        ...state,
        vendorSubscribeStatus: helpers.getDefaultState()
      };
    }
    case types.VENDOR_UNSUBSCRIBE: {
      return {
        ...state,
        vendorUnsubscribeStatus: helpers.getRequestState()
      };
    }
    case types.VENDOR_UNSUBSCRIBE_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        subscribedVendors: state.subscribedVendors.filter((el) => el !== payload),
        vendorUnsubscribeStatus: helpers.getSuccessState(payload)
      };
    }
    case types.VENDOR_UNSUBSCRIBE_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        vendorUnsubscribeStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_VENDOR_UNSUBSCRIBE_STATUS: {
      return {
        ...state,
        vendorUnsubscribeStatus: helpers.getDefaultState()
      };
    }
    default:
      return state;
  }
};

export default vendorReducer;
