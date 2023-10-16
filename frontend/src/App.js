import './App.scss';

import React, { Suspense, lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { Redirect } from 'react-router';
import ErrorPage from './components/Common/ErrorPage/ErrorPage';
import history from './modules/history';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import HomeContainer from './pages/HomeContainer';
import configStore from './stores/configureStore';

const AuthWrapper = lazy(() => import('./components/AuthWrapper/index'));
const store = configStore();

const className = 'c-App';

function App() {
  return (
    <div className={className}>
      <Router history={history}>
        <Provider store={store}>
          <Suspense
            fallback={
              <div style={{ background: '#2c2d2e', height: '100%' }} />
            }>
            <Switch>
              <Route exact path="/" component={() => <HomeContainer />} />
              <Route
                exact
                path="/login"
                component={() => (
                  <AuthWrapper>
                    <LoginPage />
                  </AuthWrapper>
                )}
              />
              <Route
                exact
                path="/sign-up"
                component={() => <SignupPage />}
              />
              <Route
                exact
                path="/logout"
                render={() => <Redirect to="/login" />}
              />
              <Route exact to="*" component={ErrorPage} />
            </Switch>
          </Suspense>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
