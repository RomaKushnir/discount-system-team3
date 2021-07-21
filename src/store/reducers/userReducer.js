import * as types from '../actionTypes';
import * as helpers from '../helpers';

const initialState = {
  loggedIn: false,
  loginStatus: helpers.getDefaultState(),
  user: null,
  getUserStatus: helpers.getDefaultState(),
  qrCode: null,
  getQRCodeStatus: helpers.getDefaultState(),
  mobileNavigationState: false,
  language: 'en'
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
    case types.GET_QRCODE: {
      return {
        ...state,
        getQRCodeStatus: helpers.getRequestState()
      };
    }
    case types.GET_QRCODE_SUCCESS: {
      const { payload } = action;
      const successMessage = 'QR Code is found';
      return {
        ...state,
        qrCode: payload,
        getQRCodeStatus: helpers.getSuccessState(successMessage)
      };
    }
    case types.GET_QRCODE_FAILURE: {
      const { payload } = action;
      return {
        ...state,
        getQRCodeStatus: helpers.getErrorState(payload)
      };
    }
    case types.CLEAR_GET_QRCODE_STATUS: {
      return {
        ...state,
        qrCode: null,
        getQRCodeStatus: helpers.getDefaultState()
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
    case types.SET_MOBILE_NAVIGATION: {
      const { payload } = action;
      return {
        ...state,
        mobileNavigationState: payload
      };
    }
    case types.CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.payload
      };
    }
    default:
      return state;
  }
};

export default userReducer;
