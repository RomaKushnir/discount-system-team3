import * as types from '../actionTypes';

export function login(payload) {
  return {
    type: types.LOGIN,
    payload
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload
  };
}

export function clearLoginStatus() {
  return {
    type: types.CLEAR_LOGIN_STATUS
  };
}

export function getQRCode(payload) {
  return {
    type: types.GET_QRCODE,
    payload
  };
}

export function getQRCodeSuccess(payload) {
  return {
    type: types.GET_QRCODE_SUCCESS,
    payload
  };
}

export function getQRCodeFailure(payload) {
  return {
    type: types.GET_QRCODE_FAILURE,
    payload
  };
}

export function clearGetQRCodeStatus() {
  return {
    type: types.CLEAR_GET_QRCODE_STATUS
  };
}

export function getUser() {
  return {
    type: types.GET_USER
  };
}

export function getUserSuccess(payload) {
  return {
    type: types.GET_USER_SUCCESS,
    payload
  };
}

export function getUserFailure(payload) {
  return {
    type: types.GET_USER_FAILURE,
    payload
  };
}

export function clearGetUserStatus() {
  return {
    type: types.CLEAR_GET_USER_STATUS
  };
}
