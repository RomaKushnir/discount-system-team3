import * as types from '../actionTypes';
import vendorReducer from './vendorReducer';
import * as helpers from '../helpers';

describe('Vendor reducer', () => {
  test('should return the initial state', () => {
    expect(vendorReducer(undefined, { type: undefined })).toEqual({
      vendors: [],
      getVendorsStatus: helpers.getDefaultState(),
      addVendorStatus: helpers.getDefaultState(),
      deleteVendorStatus: helpers.getDefaultState()
    });
  });
  test('should handle GET_VENDORS', () => {
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState()
      },
      { type: types.GET_VENDORS }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getRequestState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState()
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
        deleteVendorStatus: helpers.getDefaultState()
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
        deleteVendorStatus: helpers.getDefaultState()
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
        deleteVendorStatus: helpers.getDefaultState()
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
        deleteVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle ADD_VENDOR', () => {
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState()
      },
      { type: types.ADD_VENDOR }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getRequestState(),
        deleteVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle ADD_VENDOR_SUCCESS', () => {
    const payload = 'Action successful!';
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getRequestState(),
        deleteVendorStatus: helpers.getDefaultState()
      },
      {
        type: types.ADD_VENDOR_SUCCESS,
        payload
      }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getSuccessState(payload),
        deleteVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle ADD_VENDOR_FAILURE', () => {
    const payload = 'Not found';
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getRequestState(),
        deleteVendorStatus: helpers.getDefaultState()
      },
      {
        type: types.ADD_VENDOR_FAILURE,
        payload
      }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getErrorState(payload),
        deleteVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle CLEAR_ADD_VENDOR_STATUS', () => {
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getRequestState(),
        deleteVendorStatus: helpers.getDefaultState()
      },
      {
        type: types.CLEAR_ADD_VENDOR_STATUS
      }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle DELETE_VENDOR', () => {
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState()
      },
      { type: types.DELETE_VENDOR }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getRequestState()
      }
    );
  });
  test('should handle DELETE_VENDOR_SUCCESS', () => {
    const payload = 7;
    const successMessage = 'Vendor successfully deleted';
    expect(vendorReducer(
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
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getRequestState()
      },
      {
        type: types.DELETE_VENDOR_SUCCESS,
        payload
      }
    )).toEqual(
      {
        vendors:
        [
          {
            title: "McDonald's",
            description: 'create and one more vendor',
            imageUrl: 'https://picsum.photos/200?random=5',
            email: 'someven7@gmail.com',
            locationId: 7,
            id: 11
          }
        ],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getSuccessState(successMessage)
      }
    );
  });
  test('should handle DELETE_VENDOR_FAILURE', () => {
    const payload = 'Not found';
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getRequestState()
      },
      {
        type: types.DELETE_VENDOR_FAILURE,
        payload
      }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getErrorState(payload)
      }
    );
  });
  test('should handle CLEAR_DELETE_VENDOR_STATUS', () => {
    expect(vendorReducer(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getSuccessState()
      },
      {
        type: types.CLEAR_DELETE_VENDOR_STATUS
      }
    )).toEqual(
      {
        vendors: [],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState()
      }
    );
  });
  test('should handle UPDATE_VENDOR_SUCCESS', () => {
    const payload = {
      title: "McDonald's",
      description: 'French fries',
      imageUrl: 'https://picsum.photos/200?random=5',
      email: 'someven7@gmail.com',
      locationId: 7,
      id: 11
    };
    const successMessage = 'Action successful!';
    expect(vendorReducer(
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
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getDefaultState(),
        deleteVendorStatus: helpers.getDefaultState()
      },
      {
        type: types.UPDATE_VENDOR_SUCCESS,
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
          payload
        ],
        getVendorsStatus: helpers.getDefaultState(),
        addVendorStatus: helpers.getSuccessState(successMessage),
        deleteVendorStatus: helpers.getDefaultState()
      }
    );
  });
});
