import * as types from '../actionTypes';
import userReducer from './userReducer';
import * as helpers from '../helpers';

describe('User reducer', () => {
  test('should return the initial state', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual({
      loggedIn: false,
      loginStatus: helpers.getDefaultState()
    });
  });
  test('should handle LOGIN', () => {
    expect(userReducer(
      {
        loggedIn: false,
        loginStatus: helpers.getDefaultState()
      },
      { type: types.LOGIN }
    )).toEqual(
      {
        loggedIn: false,
        loginStatus: helpers.getRequestState()
      }
    );
  });
  test('should handle LOGIN_SUCCESS', () => {
    const payload = 'You are logged in';
    expect(userReducer(
      {
        loggedIn: false,
        loginStatus: helpers.getDefaultState()
      },
      {
        type: types.LOGIN_SUCCESS,
        payload
      }
    )).toEqual(
      {
        loggedIn: true,
        loginStatus: helpers.getSuccessState(payload)
      }
    );
  });
  test('should handle LOGIN_FAILURE', () => {
    const payload = 'Not found';
    expect(userReducer(
      {
        loggedIn: false,
        loginStatus: helpers.getRequestState()
      },
      {
        type: types.LOGIN_FAILURE,
        payload
      }
    )).toEqual(
      {
        loggedIn: false,
        loginStatus: helpers.getErrorState(payload)
      }
    );
  });
  test('should handle CLEAR_LOGIN_STATUS', () => {
    expect(userReducer(
      {
        loggedIn: true,
        loginStatus: helpers.getSuccessState()
      },
      {
        type: types.CLEAR_LOGIN_STATUS
      }
    )).toEqual(
      {
        loggedIn: false,
        loginStatus: helpers.getDefaultState()
      }
    );
  });
});
