import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.scss';
import Routes from './routes';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Login from './pages/Login';
import Discounts from './pages/Discounts';
import Vendor from './pages/Vendor';
import Statistics from './pages/Statistics';
import Favourites from './pages/Favourites';
import MyDiscounts from './pages/MyDiscounts';
import Categories from './pages/Categories';
import Vendors from './pages/Vendors';
import isAdmin from './utilities/isAdmin';

function App() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <PublicRoute path = {Routes.ROOT} component = {Login} exact = {true}/>
          <PublicRoute path = {Routes.LOGIN} component = {Login}/>
          <PrivateRoute path = {Routes.DISCOUNTS} component = {Discounts}/>
          <PrivateRoute path = {Routes.VENDOR_ID} component = {Vendor}/>
          <PrivateRoute path = {Routes.VENDORS} component = {Vendors}/>
          <PrivateRoute path = {Routes.STATISTICS} >
            {isAdmin(user) ? <Statistics /> : <Redirect to={Routes.DISCOUNTS} />}
          </PrivateRoute>
          <PrivateRoute path = {Routes.FAVOURITES} component = {Favourites}/>
          <PrivateRoute path = {Routes.MY_DISCOUNTS} component = {MyDiscounts}/>
          <PrivateRoute path = {Routes.CATEGORIES}>
            {isAdmin(user) ? <Categories /> : <Redirect to={Routes.DISCOUNTS} />}
          </PrivateRoute>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
