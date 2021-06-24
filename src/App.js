import { useSelector } from 'react-redux';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom';
import './App.scss';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  const isLoggedIn = useSelector((state) => state.userReducer.loggedIn);
  console.log(isLoggedIn);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          { isLoggedIn ? <PrivateRoutes/> : <PublicRoutes/> }
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
