export const setLoginFailed = (message) => ({
  type: 'SET_LOGIN_FAILED',
  message
});

export const setSuccess = (message) => ({
  type: 'SET_SUCCESS',
  message
});

export const setLoading = (load) => ({
  type: 'SET_LOADING',
  load
});
