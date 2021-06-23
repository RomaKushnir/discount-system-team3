import { useState } from 'react';
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
import Statistics from './pages/Statistics';
import Favourites from './pages/Favourites';
import MyDiscounts from './pages/MyDiscounts';
import Categories from './pages/Categories';

function App() {
  const [isLoggedIn] = useState(true);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Redirect exact from = {Routes.ROOT} to = { isLoggedIn ? Routes.DISCOUNTS : Routes.LOGIN } />
          <Route path = {Routes.LOGIN}>
            <Login />
          </Route>
          <Route path = {Routes.DISCOUNTS}>
            <Discounts />
          </Route>
          <Route path = {Routes.VENDOR_ID}>
            <Vendor />
          </Route>
          <Route path = {Routes.VENDORS}>
            <Vendors />
          </Route>
          <Route path = {Routes.STATISTICS}>
            <Statistics />
          </Route>
          <Route path = {Routes.FAVOURITES}>
            <Favourites />
          </Route>
          <Route path = {Routes.MY_DISCOUNTS}>
            <MyDiscounts />
          </Route>
          <Route path = {Routes.CATEGORIES}>
            <Categories />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
