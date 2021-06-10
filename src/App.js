import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.scss';
import Routes from './routes';
import Login from './pages/Login';
import Discounts from './pages/Discounts';
import Vendor from './pages/Vendor';
import Vendors from './pages/Vendors';

function App() {
  const [isLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect exact from = "/" to = { isLoggedIn ? Routes.DISCOUNTS : Routes.LOGIN } />
          <Route path = {Routes.LOGIN}>
            <Login />
          </Route>
          <Route path = {Routes.DISCOUNTS}>
            <Discounts />
          </Route>
          <Route path = {Routes.VENDOR}>
            <Vendor />
          </Route>
          <Route path = {Routes.VENDORS}>
            <Vendors />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
