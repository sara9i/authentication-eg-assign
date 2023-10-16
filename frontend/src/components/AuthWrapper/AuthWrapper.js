import { parse } from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startLoginCheck } from '../../actions/auth';
import Auth from '../../modules/auth';

const AuthWrapper = ({ children, history }) => {
  const dispatch = useDispatch();

  const setTokens = async (uriToken, uriRefreshToken) => {
    Auth.setUriTokens(uriToken, uriRefreshToken);
  };

  useEffect(() => {
    const loginWithToken = async () => {
      const parsedParamsObj = parse(window.location.search);
      const uriToken = parsedParamsObj?.token;
      const uriRefreshToken = parsedParamsObj?.refreshToken;

      const pathnameWithParams = `${history.location.pathname}${history.location.search}`;

      if (uriToken) {
        Auth.deauthenticateUser();
        await setTokens(uriToken, uriRefreshToken);
        dispatch(
          startLoginCheck(uriToken, uriRefreshToken, pathnameWithParams)
        );
      } else {
        Auth.deleteUriTokens();
        const email = parsedParamsObj?.email;

        const token = Auth.getUserToken();
        const refreshToken = Auth.getRefreshToken();
        dispatch(
          startLoginCheck(token, refreshToken, pathnameWithParams, email)
        );
      }
    };

    loginWithToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="c-AuthWrapper">{children}</div>;
};

export default withRouter(AuthWrapper);
