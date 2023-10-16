import { checkIsWebView } from '../utilities/webview';

const defaultState = {
  loginFailed: false,
  resetPasswordFailed: false,
  loading: false,
  isWebView: checkIsWebView(window?.navigator?.userAgent)
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_FAILED':
      return {
        ...state,
        loginFailed: action.message
      };

    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.message
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.load
      };

    default:
      return state;
  }
};
