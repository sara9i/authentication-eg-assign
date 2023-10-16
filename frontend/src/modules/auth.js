class Auth {
  /**
   * Save the user data in session Storage
   *
   * @param {string} userData
   * @param {string} accessToken
   */
  static authenticateUser(userData, accessToken) {
    if (userData)
      localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('accessToken', accessToken);
  }

  static setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  /**
   * De-authenticate a user.
   * Remove a token from session Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    Auth.deleteUriTokens();
  }

  /**
   * return user token
   *
   * @returns {string}
   */
  static getUserToken() {
    return localStorage.getItem('accessToken');
  }

  /**
   * return user token
   *
   * @returns {string}
   */
  static getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  /**
   * return user data
   *
   * @returns {object}
   */
  static getUserData() {
    const userDataStr = localStorage.getItem('userData');

    if (userDataStr === 'undefined') return null; // for backward compatability

    return userDataStr ? JSON.parse(userDataStr) : null;
  }

  /**
   * set user data
   *
   */
  static setUserData(userData) {
    if (userData)
      localStorage.setItem('userData', JSON.stringify(userData));
  }
  static setUriTokens(token, refreshToken) {
    localStorage.setItem('uriAccessToken', token);
    localStorage.setItem('uriRefreshToken', refreshToken);
  }

  static getUriTokens() {
    return {
      token: localStorage.getItem('uriAccessToken') || '',
      refreshToken: localStorage.getItem('uriRefreshToken') || ''
    };
  }

  static deleteUriTokens() {
    localStorage.removeItem('uriAccessToken');
    localStorage.removeItem('uriRefreshToken');
  }
}

export default Auth;
