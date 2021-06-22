import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import vendorReducer from './vendorReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({ locationReducer, vendorReducer, categoryReducer });

export default rootReducer;
