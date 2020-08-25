import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useStore } from './store/postsContext';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import Login from './components/auth/login/Login';
import Register from './components/auth/Register';
import GuardRoute from './utils/GuardRoute';
import Home from './components/home/Home';
import { deleteUserLS, getToken } from './utils/localStorage';
import Modal from './components/modal/Modal';

import './App.css';

const App = () => {
  const store = useStore();
  useEffect(() => {
    autoConnect();
  }, []);
console.log('APP')
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
