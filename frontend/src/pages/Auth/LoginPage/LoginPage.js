import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../../components/Authentication/LoginForm';
import Card from '../../../components/Card';
import Image from '../../../components/Image';
import '../AuthPage.scss';
import { login_logo, sideImageData } from '../constants';

const LoginPage = () => {
  const className = 'c-AuthPage';

  return (
    <div className={className}>
      <div className={`${className}__container`}>
        <div className={`${className}__background__wrapper`}>
          <Image {...sideImageData} />
        </div>
        <Card>
          <div className={`${className}__logo__wrapper`}>
            <Image {...login_logo} />
          </div>
          <div className={`${className}__subtext`}>
            Level up your e-learning creation
          </div>
          <div className={`${className}__form__wrapper`}>
            <LoginForm />
            <div className="mb-24 font-poppins text-label-sm lg:text-label-md">
              <span className="text-light-text text-grey-neutral50">
                Not a member?{' '}
              </span>
              <span className="underline">
                <Link to="/sign-up">Signup</Link>
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
