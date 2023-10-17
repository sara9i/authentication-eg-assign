/* eslint-disable no-unused-vars */
import { parse } from 'query-string';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startLoginCheck, startLogout } from '../../actions/auth';
import NavBar from '../../components/Navbar';
import WelcomeNote from '../../components/WelcomeNote/WelcomeNote';
import Auth from '../../modules/auth';
import './HomeContainer.scss';
const HomeContainer = ({ history, dispatch }) => {
  const user = Auth.getUserData();

  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState(null);
  const parsedParamsObj = parse(window.location.search);

  const loginWithToken = useCallback(() => {
    const uriToken = parsedParamsObj?.token;
    const uriRefreshToken = parsedParamsObj?.refreshToken;
    const token = Auth.getUserToken();
    const refreshToken = Auth.getRefreshToken();

    if (uriToken) {
      Auth.deauthenticateUser();
      Auth.setUriTokens(uriToken, uriRefreshToken);
      dispatch(
        startLoginCheck(
          uriToken,
          uriRefreshToken,
          history.location.pathname
        )
      );
    } else {
      Auth.deleteUriTokens();
      dispatch(
        startLoginCheck(token, refreshToken, history.location.pathname)
      );
    }
  }, [history.location.pathname, dispatch]);

  const logOut = () => {
    dispatch(startLogout(history.location.pathname));
  };

  useEffect(() => loginWithToken(), [loginWithToken]);

  useEffect(() => {
    const resetToken = parsedParamsObj?.resetToken;
    if (user?.status === 'PENDING' && resetToken) {
      setIsPassModalOpen(true);
      setResetPasswordToken(resetToken);
    }
  }, [user]);

  let baseClassName = 'c-HomeContainer';

  if (user) {
    return (
      <div className={`${baseClassName}__main-container`}>
        <div className={`${baseClassName}__content`}>
          <NavBar logoutClick={logOut} />
          <div className={`${baseClassName}__content-item`}>
            <div className={`${baseClassName}__main-content-area`}>
              <WelcomeNote userName={user?.name}></WelcomeNote>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  id: state.auth.id,
  loginFailed: state.main.loginFailed,
  currentRoute: state.routes.currentRoute,
  user: state.user.user
});

export default connect(mapStateToProps)(withRouter(HomeContainer));
