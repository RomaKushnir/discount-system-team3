import * as types from '../actionTypes';
import vendorReducer from './vendorReducer';
import * as helpers from '../helpers';

describe('Vendor reducer', () => {
  test('should return the initial state', () => {
    expect(vendorReducer(undefined, { type: undefined })).toEqual({
      vendors: [],
      getVendorsStatus: helpers.getDefaultState(),
      addVendorStatus: helpers.getDefaultState(),
      deleteVendorStatus: helpers.getDefaultState(),
      updateVendorStatus: helpers.getDefaultState()
    });
  });
  test('should handle GET_VENDORS', () => {
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState(),
        updateVendorStatus: helpers.getDefaultState()
      },
      { type: types.GET_VENDORS }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getRequestState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState(),
        updateVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle GET_VENDORS_SUCCESS', () => {
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
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getRequestState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState(),
        updateVendorStatus: helpers.getDefaultState()
      },
      {
        type: types.GET_VENDORS_SUCCESS,
        payload
      }
    )).toEqual(
      {
        vendors:
        [
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
        ],
        getVendorsStatus: helpers.getSuccessState(payload),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState(),
        updateVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle GET_VENDORS_FAILURE', () => {
    const payload = 'Not found';
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getRequestState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState(),
        updateVendorStatus: helpers.getDefaultState()
      },
      {
        type: types.GET_VENDORS_FAILURE,
        payload
      }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getErrorState(payload),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState(),
        updateVendorStatus: helpers.getDefaultState()
      }
    );
  });
});
