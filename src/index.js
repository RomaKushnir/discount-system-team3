import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'normalize.css';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, appStore } from './store';
import * as actions from './store/actions';
import './i18n';

const token = localStorage.getItem('token');
if (token) {
  appStore.dispatch(actions.userActions.loginSuccess());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
