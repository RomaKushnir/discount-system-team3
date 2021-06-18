import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import vendorReducer from './vendorReducer';
import categoryReducer from './categoryReducer';
import discountsReducer from './discountsReducer';

const rootReducer = combineReducers({
  locationReducer, vendorReducer, discountsReducer, categoryReducer
});

export default rootReducer;
