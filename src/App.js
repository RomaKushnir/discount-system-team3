import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.scss';
import Routes from './routes';
import Login from './pages/Login';
import Discounts from './pages/Discounts';
import Vendor from './pages/Vendor';
import Vendors from './pages/Vendors';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path = {Routes.DISCOUNTS}>
            <Discounts />
          </Route>
          <Route path = {Routes.VENDOR}>
            <Vendor />
          </Route>
          <Route path = {Routes.VENDORS}>
            <Vendors />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
