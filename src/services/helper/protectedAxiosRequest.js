import axios from 'axios';
import { getTokensService } from '../../actions/auth';
import keys from '../../config/keys';
import Auth from '../../modules/auth';
const { baseURL } = keys;

const protectedAxiosRequest = axios.create({
  baseURL
});

const protectedReqConfigMiddleware = (request) => {
  return setAuthHeadersMiddleware(request);
};

export const setAuthHeadersMiddleware = (request) => {
  const accessToken = 'Bearer '.concat(Auth.getUserToken());

  if (accessToken) {
    const argHeaders = request?.headers || {};
    request.headers = {
      Authorization: accessToken,
      ...argHeaders
    };
  }

  return request;
};

// eslint-disable-next-line no-unused-vars
export const handle401ResponseMiddleware = async (error, fetchFn) => {
  const status = error?.response?.status;
  const originalRequest = error.config;
  const uriTokens = Auth.getUriTokens();
  const refreshToken = uriTokens.refreshToken || Auth.getRefreshToken();

  if (refreshToken && status === 401) {
    const payload = { refreshToken };
    return getTokensService(payload)
      .then((response) => {
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return protectedAxiosRequest(originalRequest);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
};

const protectedReqErrorMiddleware = (error) => {
  return Promise.reject(error);
};

const protectedResMiddleware = (response) => response;
const protectedResErrorMiddleware = (error) => {
  // Log error

  const status = error?.response?.status;
  const originalRequest = error.config;
  const uriTokens = Auth.getUriTokens();
  const refreshToken = uriTokens.refreshToken || Auth.getRefreshToken();

  if (refreshToken && status === 401) {
    const payload = { refreshToken };
    return getTokensService(payload)
      .then((response) => {
        originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
        return protectedAxiosRequest(originalRequest);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  return Promise.reject(error);
};

// Request interceptors
protectedAxiosRequest.interceptors.request.use(
  protectedReqConfigMiddleware,
  protectedReqErrorMiddleware
);

// Response interceptors
protectedAxiosRequest.interceptors.response.use(
  protectedResMiddleware,
  protectedResErrorMiddleware
);

export default protectedAxiosRequest;
