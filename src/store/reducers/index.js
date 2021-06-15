import { combineReducers } from 'redux';
import locationReducer from './locationReducer';
import vendorReducer from './vendorReducer';

const rootReducer = combineReducers({ locationReducer, vendorReducer });

export default rootReducer;
