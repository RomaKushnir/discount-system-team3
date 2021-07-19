import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '../routes';

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector((state) => state.userReducer.loggedIn);
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <Route {...rest} component = {(props) => (
      isLoggedIn
        ? <Component {...props} />
        : <Redirect to = {{ pathname: Routes.ROOT, state: { from: currentLocation } }} />
    )}/>
  );
}

export default PrivateRoute;
