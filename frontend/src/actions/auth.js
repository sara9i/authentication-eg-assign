import axios from 'axios';
import keys from '../config/keys';
import Auth from '../modules/auth';
import history from '../modules/history';

import { setLoading, setLoginFailed } from './main';
import { setCurrentRoute } from './routes';
import { setUser } from './user';

const { baseURL } = keys;

export const login = (id, user) => ({
  type: 'LOGIN',
  id,
  user
});

export const signup = (user) => ({
  type: 'SIGNUP',
  user
});

export const logout = () => ({
  type: 'LOGOUT'
});

const _checkFieldNotEmpty = (field) => {
  return field && field !== '';
};

const _passwordIsStrong = (password) => {
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'
  );
  return strongRegex.test(password);
};

export const startSignUp = (email, password, confirmPassword, token) => {
  return (dispatch) => {
    dispatch(setLoading(true));

    let dt = {};
    // Check token
    if (token) {
      dt = { email, password, password2: confirmPassword, token };
    } else {
      dt = { email, password, password2: confirmPassword };
    }
    if (
      _checkFieldNotEmpty(password) &&
      _checkFieldNotEmpty(confirmPassword) &&
      password === confirmPassword
    ) {
      if (password !== confirmPassword) {
        dispatch(setLoading(false));
        dispatch(setLoginFailed('Confirm Password does not match.'));
      } else if (!_passwordIsStrong(password)) {
        dispatch(setLoading(false));
        dispatch(
          setLoginFailed(
            'Please choose a stronger password. Password has to contain at least 1 uppercase alphabetical character, 1 lowercase alphabetical character, 1 numeric character and eight characters or longer'
          )
        );
      } else {
        axios
          .post(`${baseURL}/auth/signup`, dt, {
            withCredentials: true
          })
          .then((response) => {
            const { token, refreshToken, user } = response.data;

            // Set user data
            Auth.authenticateUser(user, token);
            Auth.setTokens(token, refreshToken);

            dispatch(setUser(user));

            dispatch(setLoginFailed(false));
            dispatch(login(user._id, user));
            dispatch(setLoading(false));
            // clear token on route params and route to home page
            history.push({
              pathname: '/',
              search: ''
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      dispatch(setLoginFailed('Invalid password'));
      dispatch(setLoading(false));
    }
  };
};

const _authenticationPromise = (callback) => {
  return new Promise((resolve) => {
    resolve(callback);
  });
};

const _postLoginProcess = (userData, token, refreshToken, dispatch) => {
  Auth.authenticateUser(userData, token);
  Auth.setTokens(token, refreshToken);
  dispatch(setUser(userData));
};

export const startLogin = (email, password, currentRoute) => {
  return (dispatch) => {
    const dt = { email, password };
    dispatch(setLoading(true));

    axios
      .post(`${baseURL}/auth/login`, dt, {
        withCredentials: true
      })
      .then((response) => {
        const { token, refreshToken } = response.data;
        const { user } = response.data;

        // Set user data
        _authenticationPromise(
          _postLoginProcess(user, token, refreshToken, dispatch)
        ).then(() => {
          dispatch(setLoginFailed(false));
          dispatch(login(user._id, user));
          dispatch(setLoading(false));
          if (!currentRoute || currentRoute.includes('/login'))
            history.push({
              pathname: '/',
              search: ''
            });
          else history.push(currentRoute);
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      });
  };
};

// export const getTokensService = (payload) => {
//   return axios
//     .post(`${baseURL}/auth/gettoken`, payload, {
//       withCredentials: true
//     })
//     .then((response) => {
//       const { token, refreshToken } = response.data;
//       Auth.setTokens(token, refreshToken);
//       Auth.deleteUriTokens(token);
//       return response;
//     });
// };

/**
 * Payload should send either authToken or refreshToken
 * @param {*} payload | Object
 * @param {*} payload.authToken | String
 * @param {*} payload.refreshToken | String
 * @param {*} currentRoute
 * @returns Promise
 */
// export const startGetTokens = (payload, currentRoute) => {
//   return (dispatch) => {
//     dispatch(setLoading(true));

//     getTokensService(payload)
//       .then((response) => {
//         const { token, refreshToken } = response.data;

//         Auth.setTokens(token, refreshToken);
//         dispatch(setLoading(false));
//         dispatch(startLoginCheck(token, refreshToken, currentRoute));
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch(setLoading(false));
//       });
//   };
// };

export const startLoginCheck = (token, currentRoute, email = '') => {
  return (dispatch) => {
    if (token) {
      dispatch(setLoginFailed(false));
      dispatch(setLoading(false));

      if (currentRoute === '/login') {
        history.push({ pathname: '/', search: '' });
      } else if (currentRoute === '/') {
        history.push({ pathname: currentRoute, search: '' });
      }
    } else if (currentRoute === '/login') {
      // Already in /Login route so dont redirect again
      dispatch(setLoginFailed(true));
    } else {
      // Requirement: If a user visits a link at deauthenticated state he should be redirect to the same link after login
      // Problem: The part of the code below redirected user from /login to /login thus losing the previous current route which got overwritten everytime as '/login'
      // Solution: If the user is already coming from /login(ie deauthenticated state) then we dont want them to redirect to /login again thus the line below
      if (currentRoute === '/login') return;

      dispatch(setCurrentRoute(currentRoute));
      dispatch(setLoginFailed(true));
      // Check if email was attached and attach if so
      const routeObject = {
        pathname: '/login',
        search: email ? '?email='.concat(encodeURIComponent(email)) : ''
      };

      history.push(routeObject);
    }
  };
};

export const startLogout = (currentRoute) => {
  return (dispatch) => {
    Auth.deauthenticateUser();
    sessionStorage.clear();
    dispatch(setCurrentRoute(currentRoute));
    dispatch(setLoginFailed(false));
    dispatch(logout());
    history.push({ pathname: '/login', search: '' });
  };
};

export const setLoginFailStatus = (message) => {
  return (dispatch) => {
    dispatch(setLoginFailed(message));
  };
};
