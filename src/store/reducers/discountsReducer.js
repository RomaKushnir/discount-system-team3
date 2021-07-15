import * as types from '../actionTypes';
import * as helpers from '../helpers';

export const defaultDiscountsFilter = {
  country: null,
  city: null,
  category: null,
  vendorTitle: '',
  shortDescription: '',
  sort: 'expirationDate,ASC',
  pageNumber: 0,
  size: 6,
  totalElements: null,
  totalPages: null
};

const initialState = {
  discounts: [],
  getDiscountsStatus: helpers.getDefaultState(),
  createDiscountStatus: helpers.getDefaultState(),
  deleteDiscountStatus: helpers.getDefaultState(),
  discountsFilters: { ...defaultDiscountsFilter },
  discountsFiltersApplied: { ...defaultDiscountsFilter },
  vendorDiscounts: [],
  vendorDiscountsParams: {
    pageNumber: 0,
    size: 6,
    totalElements: null,
    totalPages: null
  },
  getVendorDiscountsStatus: helpers.getDefaultState(),
  activateDiscountStatus: helpers.getDefaultState(),
  getDiscountByIdStatus: helpers.getDefaultState(),
  discountById: null
};

const discountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DISCOUNTS: {
      return {
        ...state,
        getDiscountsStatus: helpers.getRequestState()
      };
    }
    case types.GET_DISCOUNTS_SUCCESS: {
      const { discounts, showMore } = action.payload;
      const {
        content, number, size, totalElements, totalPages
      } = discounts;

      return {
        ...state,
        discounts: showMore ? [...state.discounts, ...content] : content,
        getDiscountsStatus: helpers.getSuccessState('Success!'),
        discountsFiltersApplied: {
          ...state.discountsFiltersApplied,
          pageNumber: number,
          size,
          totalElements,
          totalPages
        }
      };
    }
    case types.GET_DISCOUNTS_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getDiscountsStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_DISCOUNTS_STATUS: {
      return {
        ...state,
        getDiscountsStatus: helpers.getDefaultState(),
        discountsFilters: {
          ...state.discountsFilters,
          pageNumber: defaultDiscountsFilter.pageNumber,
          size: defaultDiscountsFilter.size
        }
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
    case types.UPDATE_DISCOUNTS_FILTERS: {
      const { payload } = action;
      return {
        ...state,
        discountsFilters: { ...state.discountsFilters, ...payload }
      };
    }
    case types.APPLY_DISCOUNTS_FILTERS: {
      return {
        ...state,
        discountsFiltersApplied: { ...state.discountsFiltersApplied, ...state.discountsFilters }
      };
    }
    case types.CLEAR_DISCOUNTS_FILTERS: {
      return {
        ...state,
        discountsFilters: { ...defaultDiscountsFilter }
      };
    }
    case types.GET_VENDOR_DISCOUNTS: {
      return {
        ...state,
        getVendorDiscountsStatus: helpers.getRequestState()
      };
    }
    case types.GET_VENDOR_DISCOUNTS_SUCCESS: {
      const { discounts, showMore } = action.payload;
      const {
        content, number, size, totalElements, totalPages
      } = discounts;

      return {
        ...state,
        vendorDiscounts: showMore ? [...state.vendorDiscounts, ...content] : content,
        getVendorDiscountsStatus: helpers.getSuccessState('Success!'),
        vendorDiscountsParams: {
          pageNumber: number,
          size,
          totalElements,
          totalPages
        }
      };
    }
    case types.GET_VENDOR_DISCOUNTS_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getVendorDiscountsStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_VENDOR_DISCOUNTS_STATUS: {
      return {
        ...state,
        getVendorDiscountsStatus: helpers.getDefaultState()
      };
    }
    case types.ACTIVATE_DISCOUNT: {
      return {
        ...state,
        activateDiscountStatus: helpers.getRequestState()
      };
    }
    case types.ACTIVATE_DISCOUNT_SUCCESS: {
      const successMessage = 'Discount is successfully activated';
      return {
        ...state,
        activateDiscountStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.ACTIVATE_DISCOUNT_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        activateDiscountStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_ACTIVATE_DISCOUNT_STATUS: {
      return {
        ...state,
        activateDiscountStatus: helpers.getDefaultState()
      };
    }
    case types.GET_DISCOUNT_BY_ID: {
      return {
        ...state,
        getDiscountByIdStatus: helpers.getRequestState()
      };
    }
    case types.GET_DISCOUNT_BY_ID_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        getDiscountByIdStatus: helpers.getSuccessState('Action successful'),
        discountById: payload
      };
    }
    case types.GET_DISCOUNT_BY_ID_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getDiscountByIdStatus: helpers.getErrorState(payload)
      };
    }
    case types.GET_DISCOUNT_BY_ID_CLEAR_STATUS: {
      return {
        ...state,
        getDiscountByIdStatus: helpers.getDefaultState()
      };
    }
    default:
      return state;
  }
};

export default discountsReducer;
