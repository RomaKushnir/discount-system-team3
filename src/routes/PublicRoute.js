import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Routes from '../routes';

function PublicRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector((state) => state.userReducer.loggedIn);

  return (
    <Route {...rest} component = {(props) => (
      isLoggedIn
        ? <Redirect to = {Routes.DISCOUNTS} />
        : <Component {...props} />
    )}/>
  );
}

export default PublicRoute;
