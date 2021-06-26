import * as actions from './userActions';
import * as types from '../actionTypes';

describe('User actions', () => {
  test('should create an action to trigger login', () => {
    const payload = {
      email: 'joe@test.com',
      password: '1234567k'
    };
    const expectedAction = {
      type: types.LOGIN,
      payload
    };
    expect(actions.login(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger login success', () => {
    const payload = '123';
    const expectedAction = {
      type: types.LOGIN_SUCCESS,
      payload
    };
    expect(actions.loginSuccess(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger login failure', () => {
    const payload = 'Either email or password is not correct';
    const expectedAction = {
      type: types.LOGIN_FAILURE,
      payload
    };
    expect(actions.loginFailure(payload)).toEqual(expectedAction);
  });
  test('should create an action to clear login status', () => {
    const expectedAction = {
      type: types.CLEAR_LOGIN_STATUS
    };
    expect(actions.clearLoginStatus()).toEqual(expectedAction);
  });
});
