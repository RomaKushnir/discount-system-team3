import * as types from '../actionTypes';

const initialState = {
  locationsList: [],
  selectedLocation: {},
  error: '',
  isLoading: false
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOCATIONS_LIST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case types.GET_LOCATIONS_LIST_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        locationsList: payload,
        isLoading: false
      };
    }
    case types.GET_LOCATIONS_LIST_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        isLoading: false
      };
    }
    case types.GET_LOCATION_BY_ID: {
      return {
        ...state,
        isLoading: true
      };
    }
    case types.GET_LOCATION_BY_ID_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        selectedLocation: payload,
        isLoading: false
      };
    }
    case types.GET_LOCATION_BY_ID_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        error: payload,
        isLoading: false
      };
    }
    default:
      return state;
  }
};

export default locationReducer;
