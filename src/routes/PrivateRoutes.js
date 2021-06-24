import {
  Switch,
  Route
} from 'react-router-dom';
import Routes from '../routes';
import Discounts from '../pages/Discounts';
import Vendor from '../pages/Vendor';
import Vendors from '../pages/Vendors';
import Statistics from '../pages/Statistics';
import Favourites from '../pages/Favourites';
import MyDiscounts from '../pages/MyDiscounts';
import Categories from '../pages/Categories';

function PrivateRoutes() {
  return (
    <Switch>
      <Route exact path = {Routes.ROOT}>
        <Discounts />
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
  );
}

export default PrivateRoutes;
