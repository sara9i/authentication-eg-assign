import axios from 'axios';
import AuthStore, { getRefreshToken } from '../../stores/authStore';

// TODO to set timeout on particular req except email template service
const privateAxiosInstance = axios.create({});

privateAxiosInstance.interceptors.request.use((config) => {
  try {
    let accessToken = AuthStore.getState().accessToken;
    config.headers.Authorization = accessToken;
    return config;
  } catch (error) {
    console.log('Error attaching token to axios instance');
    return config;
  }
});

privateAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // eslint-disable-next-line no-unused-vars
        let response = await refreshAccessToken();
        return privateAxiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  try {
    let refreshToken = getRefreshToken(AuthStore.getState());
    let response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/refreshToken`,
      {
        refreshToken
      }
    );
    AuthStore.dispatch({ type: 'AUTH/LOG_IN', payload: response.data });
    return response.data.refreshToken;
  } catch (error) {
    AuthStore.dispatch({ type: 'AUTH/LOG_OUT' });
    throw new Error('Error refreshing token!');
  }
};

export default privateAxiosInstance;
