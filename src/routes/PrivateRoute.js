import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '../routes';

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector((state) => state.userReducer.loggedIn);

  return (
    <Route {...rest} component = {(props) => (
      isLoggedIn
        ? <Component {...props} />
        : <Redirect to = {Routes.ROOT} />
    )}/>
  );
}

export default PrivateRoute;
