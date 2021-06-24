import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import vendorReducer from './vendorReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  locationReducer,
  vendorReducer,
  categoryReducer,
  userReducer
});

export default rootReducer;
