import {
  BrowserRouter,
  Switch
} from 'react-router-dom';
import './App.scss';
import { createBrowserHistory } from 'history';
import Routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
import Discounts from './pages/Discounts';
import Vendor from './pages/Vendor';
import Vendors from './pages/Vendors';
import Statistics from './pages/Statistics';
import Favourites from './pages/Favourites';
import MyDiscounts from './pages/MyDiscounts';
import Categories from './pages/Categories';

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute path = {Routes.ROOT} component = {Login} exact = {true}/>
          <PrivateRoute path = {Routes.DISCOUNTS} component = {Discounts}/>
          <PrivateRoute path = {Routes.VENDOR_ID} component = {Vendor}/>
          <PrivateRoute path = {Routes.VENDORS} component = {Vendors}/>
          <PrivateRoute path = {Routes.STATISTICS} component = {Statistics}/>
          <PrivateRoute path = {Routes.FAVOURITES} component = {Favourites}/>
          <PrivateRoute path = {Routes.MY_DISCOUNTS} component = {MyDiscounts}/>
          <PrivateRoute path = {Routes.CATEGORIES} component = {Categories}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
