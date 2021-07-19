import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '../routes';

function PublicRoute({ component: Component, ...rest }) {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.userReducer.loggedIn);

  const { from } = location.state || { from: { pathname: Routes.DISCOUNTS } };

  return (
    <Route {...rest} component = {(props) => (
      isLoggedIn
        ? <Redirect to = {from} />
        : <Component {...props} />
    )}/>
  );
}

export default PublicRoute;
