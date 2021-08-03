import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { setCurrentUser, logoutUser } from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import store from './store';

import Dashboard from './pages/dashboard';
import Arbitrage from './pages/arbitrage';
import Tracker from './pages/tracker';
import Register from './pages/register';
import Login from './pages/login';
import Init from './pages/init';
import Tracker1 from './pages/tracker1';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = './login';
  }
} 



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">            
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/exchange" component={Arbitrage} />
              <Route exact path="/tracker" component={Tracker} />
              <Route exact path="/tracker1" component={Tracker1} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/init" component={Init} />
              <Redirect to="/login" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
