import { Button } from 'antd';
import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import './Navbar.scss';

const NavBar = ({ logoutClick }) => {
  const className = 'c-Navbar';
  let homeLink = '/';

  return (
    <div className={className}>
      <div className={`${className}__logo__wrapper`}>
        <Link to={{ pathname: homeLink }}>
          <img
            className={`${className}__logo`}
            src="https://www.easygenerator.com/wp-content/themes/easygenerator/assets/images/logo.svg"
            alt="logo"
          />
        </Link>
      </div>
      <div className={`${className}__button`}>
        <Button onClick={logoutClick}>Logout</Button>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  logoutClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  id: state.auth.id,
  user: state.auth.user
});

export default connect(mapStateToProps)(withRouter(NavBar));
