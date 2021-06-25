import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import vendorReducer from './vendorReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';
import discountsReducer from './discountsReducer';

const rootReducer = combineReducers({
  locationReducer,
  vendorReducer,
  categoryReducer,
  userReducer,
  discountsReducer
});

export default rootReducer;
