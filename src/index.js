import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'normalize.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import appStorage from './store';
import * as actions from './store/actions';

const token = localStorage.getItem('token');
console.log(token);
if (token) {
  appStorage.dispatch(actions.userActions.loginSuccess());
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={appStorage}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
