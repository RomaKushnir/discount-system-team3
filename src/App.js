import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Router,
  Switch,
  Redirect
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import InfoPage from './pages/InfoPage';
import history from './history';
import ThemeMode from './utilities/theme-context';

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const [mode, setMode] = useState(ThemeMode);
  const theme = localStorage.getItem('theme');
  document.documentElement.setAttribute('theme', theme);
  return (
    <ThemeMode.Provider value = {[mode, setMode]}>
      <Router history = {history}>
      <div className="App">
        <Switch>
          <PublicRoute path = {Routes.DISCOUNT_INFO} component = {InfoPage}/>
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
        <ToastContainer/>
      </div>
    </Router>
    </ThemeMode.Provider>
  );
}

export default App;
