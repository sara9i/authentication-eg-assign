import { PropTypes } from 'prop-types';
import React from 'react';
import './Card.scss';

const cardTypes = {
  light: 'light',
  dark: 'dark'
};

const cardTypesArr = Object.keys(cardTypes);

const Card = ({ success, type, children }) => {
  const className = 'c-Card';

  const classNames = [
    className,
    success ? ` ${className}--success` : '',
    type ? ` ${className}--${type}` : ''
  ].join('');

  return <div className={classNames}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.any.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  type: PropTypes.oneOf(cardTypesArr)
};

Card.defaultProps = {
  type: 'light'
};

export default Card;
