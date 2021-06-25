import {
  Switch,
  Route
} from 'react-router-dom';
import Routes from '../routes';
import Login from '../pages/Login';

function PublicRoutes() {
  return (
    <Switch>
      <Route exact path = {Routes.ROOT}>
        <Login />
      </Route>
      <Route path = {Routes.LOGIN}>
        <Login />
      </Route>
    </Switch>
  );
}

export default PublicRoutes;
