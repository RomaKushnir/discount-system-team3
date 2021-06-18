import * as actions from './vendorActions';
import * as types from '../actionTypes';

describe('Vendor actions', () => {
  test('should create an action to trigger getting of vendors', () => {
    const expectedAction = {
      type: types.GET_VENDORS
    };
    expect(actions.getVendors()).toEqual(expectedAction);
  });
  test('should create an action to trigger getting of vendors success', () => {
    const payload = [
      {
        title: 'Sport Life',
        description: 'create forth vendor',
        imageUrl: 'https://picsum.photos/200?random=2',
        email: 'someven4@gmail.com',
        locationId: 4,
        id: 7
      },
      {
        title: "McDonald's",
        description: 'create and one more vendor',
        imageUrl: 'https://picsum.photos/200?random=5',
        email: 'someven7@gmail.com',
        locationId: 7,
        id: 11
      }
    ];
    const expectedAction = {
      type: types.GET_VENDORS_SUCCESS,
      payload
    };
    expect(actions.getVendorsSuccess(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger getting of vendors failure', () => {
    const payload = 'Not found';
    const expectedAction = {
      type: types.GET_VENDORS_FAILURE,
      payload
    };
    expect(actions.getVendorsFailure(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger creation of vendor', () => {
    const payload = {
      title: 'Sport Life',
      description: 'create forth vendor',
      imageUrl: 'https://picsum.photos/200?random=2',
      email: 'someven4@gmail.com',
      locationId: 4
    };
    const expectedAction = {
      type: types.ADD_VENDOR,
      payload
    };
    expect(actions.addVendor(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger creation of vendor success', () => {
    const payload = {
      title: "McDonald's",
      description: 'create and one more vendor',
      imageUrl: 'https://picsum.photos/200?random=5',
      email: 'someven7@gmail.com',
      locationId: 7,
      id: 11
    };
    const expectedAction = {
      type: types.ADD_VENDOR_SUCCESS,
      payload
    };
    expect(actions.addVendorSuccess(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger creation of vendor failure', () => {
    const payload = 'Not found';
    const expectedAction = {
      type: types.ADD_VENDOR_FAILURE,
      payload
    };
    expect(actions.addVendorFailure(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger update of vendor success', () => {
    const payload = {
      title: 'Roshen',
      description: 'Confectionary',
      imageUrl: 'https://picsum.photos/200?random=15',
      email: 'test@roshen.com',
      locationId: 4,
      id: 41
    };
    const expectedAction = {
      type: types.UPDATE_VENDOR_SUCCESS,
      payload
    };
    expect(actions.updateVendorSuccess(payload)).toEqual(expectedAction);
  });
  test('should create an action to add vendor clear status', () => {
    const expectedAction = {
      type: types.ADD_VENDOR_CLEAR_STATUS
    };
    expect(actions.addVendorClearStatus()).toEqual(expectedAction);
  });
  test('should create an action to trigger deletion of vendor', () => {
    const payload = 3;
    const expectedAction = {
      type: types.DELETE_VENDOR,
      payload
    };
    expect(actions.deleteVendor(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger deletion of vendor success', () => {
    const payload = 'Ok';
    const expectedAction = {
      type: types.DELETE_VENDOR_SUCCESS,
      payload
    };
    expect(actions.deleteVendorSuccess(payload)).toEqual(expectedAction);
  });
  test('should create an action to trigger deletion of vendor failure', () => {
    const payload = 'Unauthorized';
    const expectedAction = {
      type: types.DELETE_VENDOR_FAILURE,
      payload
    };
    expect(actions.deleteVendorFailure(payload)).toEqual(expectedAction);
  });
  test('should create an action to deletion vendor clear status', () => {
    const expectedAction = {
      type: types.DELETE_VENDOR_CLEAR_STATUS
    };
    expect(actions.deleteVendorClearStatus()).toEqual(expectedAction);
  });
});
