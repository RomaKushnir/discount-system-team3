import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  loggedIn: false,
  loginStatus: helpers.getDefaultState(),
  user: null,
  getUserStatus: helpers.getDefaultState()
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
    case types.GET_USER: {
      return {
        ...state,
        getUserStatus: helpers.getRequestState()
      };
    }
    case types.GET_USER_SUCCESS: {
      const { payload } = action;
      const successMessage = 'Welcome!';
      return {
        ...state,
        user: payload,
        getUserStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.GET_USER_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        loginStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_USER_STATUS: {
      return {
        ...state,
        user: null,
        loginStatus: helpers.getDefaultState()
      };
    }
    default:
      return state;
  }
};

export default userReducer;
