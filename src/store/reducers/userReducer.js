import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  loggedIn: false,
  loginStatus: helpers.getDefaultState()
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {
        ...state,
        loginStatus: helpers.getRequestState()
      };
    }
    case types.LOGIN_SUCCESS: {
      const successMessage = 'You are logged in';
      return {
        ...state,
        loggedIn: true,
        loginStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.LOGIN_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        loginStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_LOGIN_STATUS: {
      return {
        ...state,
        loggedIn: false,
        loginStatus: helpers.getDefaultState()
      };
    }
    default:
      return state;
  }
};

export default userReducer;
