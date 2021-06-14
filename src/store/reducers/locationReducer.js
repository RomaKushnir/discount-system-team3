import * as types from '../actionTypes';

const initialState = {
  countriesList: [],
  allCitiesList: [],
  selectedCities: []
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COUNTRIES_LIST_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        countriesList: payload
      };
    }
    case types.GET_ALL_CITIES_LIST_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        allCitiesList: payload
      };
    }
    case types.GET_SELECTED_CITIES_LIST_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        selectedCities: payload
      };
    }
    default:
      return state;
  }
};

export default locationReducer;
