import * as types from '../actionTypes';

const initialState = {
  locationsList: [],
  selectedLocation: {}
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOCATIONS_LIST_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        locationsList: payload
      };
    }
    case types.GET_LOCATION_BY_ID_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        selectedLocation: payload
      };
    }
    default:
      return state;
  }
};

export default locationReducer;
