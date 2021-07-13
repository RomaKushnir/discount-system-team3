import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['userReducer']
};
const pReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const appStore = createStore(pReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
const persistor = persistStore(appStore);

sagaMiddleware.run(rootSaga);

export { persistor, appStore };
