export const setUserData = (user) => ({
  type: 'SET_USER_DATA',
  user
});

export const setUserToken = (token) => ({
  type: 'SET_USER_TOKEN',
  token: token
});

export const setUser = (user) => {
  return (dispatch) => {
    dispatch(setUserData(user));
  };
};

export const setToken = (token) => {
  return (dispatch) => {
    dispatch(setUserToken(token));
  };
};
