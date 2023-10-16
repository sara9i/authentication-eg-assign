import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import mainReducer from '../reducers/main';
import routesReducer from '../reducers/routes';
import userReducer from '../reducers/user';

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      main: mainReducer,
      routes: routesReducer,
      user: userReducer
    }),
    applyMiddleware(thunk)
  );

  return store;
};
