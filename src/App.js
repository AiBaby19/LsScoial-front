//prevent "configured observer batching" error
import 'mobx-react-lite/batchingForReactDom';

import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useStore } from './store/postsContext';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/Register';
import GuardRoute from './utils/GuardRoute';
import Home from './components/home/Home';
import { deleteUserLS, getToken, getUserName } from './utils/localStorage';
import Modal from './components/modal/Modal';
import './App.css';

const App = () => {
  const store = useStore();
  useEffect(() => {
    autoConnect();
  }, []);

  useEffect(() => {
    return () => {console.log('')};
  }, []);

  const autoConnect = () => {
    const token = getToken();
    if (!token) return;
    store.autoConnect(token);
  };

  const logout = () => {
    deleteUserLS();

    store.logout();
  };

  const renderNav = () => {
    return (
      <nav>
        <div className='nav-wrapper wrapper'>
          <div className='logo'>
            <p>LsSocial</p>
          </div>
          <ul>
            <span className='authButtons'>
              {store.isLoggedIn ? (
                <>
                  <li>
                    <i className='fas fa-user'></i>
                    {getUserName()}
                  </li>
                  <li className='pointer' onClick={logout}>
                   Logout
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link to='/register'>Register</Link>
                  </li>
                </>
              )}
            </span>
          </ul>
        </div>
      </nav>
    );
  };

  return useObserver(() => (
    <Router>
      <div className='container'>
        {renderNav()}
        {store.modal && <Modal />}
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
                redirectTo={'/'}
                component={Register}
                auth={!store.isLoggedIn}
              />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  ));
};

export default App;
