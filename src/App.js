import React, { useState, useEffect } from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import { useStore } from './store/postsContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';
import GuardRoute from './utils/GuardRoute';
import Home from './components/home/Home';
import { deleteToken } from './utils/localStorage';
import './App.css';

const App = () => {
  const store = useStore();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // to mobix
  useEffect(() => {
    if (!isLoggedIn) {
      // autoAuthenticate();
    }
  }, []);

  const logout = () => {
    deleteToken();
    store.logout();
  };

  const renderNav = () => {
    return (
      <nav>
        <div className='nav-wrapper wrapper'>
          <Link to='/'>
            <div className='logo'>
              <p>Logo</p>
            </div>
          </Link>
          <ul>
            {store.isLoggedIn ? (
              <li onClick={logout}>Logout</li>
            ) : (
              <span className='authButtons'>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </span>
            )}
          </ul>
        </div>
      </nav>
    );
  };

  return useObserver(() => (
    <Router>
      <div className='container'>
        {renderNav()}
        <main>
          <div className='wrapper'>
            <Switch>
              <GuardRoute
                path='/'
                exact
                component={Home}
                redirectTo={'/login'}
                auth={store.isLoggedIn}
              />
              <GuardRoute
                path='/login'
                component={Login}
                redirectTo={'/'}
                auth={!store.isLoggedIn}
              />
              <GuardRoute
                path='/register'
                component={Register}
                auth={!store.isLoggedIn}
              />
            </Switch>
          </div>
        </main>
        <footer>
          <div>Footer</div>
        </footer>
      </div>
    </Router>
  ));
};

export default App;
