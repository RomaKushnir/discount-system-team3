import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  locationsList: [],
  selectedLocation: {},
  getLocationsStatus: helpers.getDefaultState(),
  getLocationByIdStatus: helpers.getDefaultState(),
  countries: [],
  getCountriesStatus: helpers.getDefaultState()
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOCATIONS_LIST: {
      return {
        ...state,
        getLocationsStatus: helpers.getRequestState()
      };
    }
    case types.GET_LOCATIONS_LIST_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        locationsList: payload.content,
        getLocationsStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_LOCATIONS_LIST_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getLocationsStatus: helpers.getErrorState(payload)
      };
    }
    case types.GET_LOCATION_BY_ID: {
      return {
        ...state,
        getLocationByIdStatus: helpers.getDefaultState()
      };
    }
    case types.GET_LOCATION_BY_ID_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        selectedLocation: payload,
        getLocationByIdStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_LOCATION_BY_ID_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getLocationByIdStatus: helpers.getErrorState(payload)
      };
    }
    case types.GET_COUNTRIES: {
      return {
        ...state,
        getCountriesStatus: helpers.getRequestState()
      };
    }
    case types.GET_COUNTRIES_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        countries: payload,
        getCountriesStatus: helpers.getSuccessState(payload)
      };
    }
    case types.GET_COUNTRIES_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getCountriesStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_COUNTRIES_STATUS: {
      return {
        ...state,
        getCountriesStatus: helpers.getRequestState()
      };
    }
    default:
      return state;
  }
};

export default locationReducer;
