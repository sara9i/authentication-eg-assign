import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../../../components/Authentication/SignupForm';
import Card from '../../../components/Card';
import Image from '../../../components/Image';
import '../AuthPage.scss';
import { login_logo, sideImageData } from '../constants';

const SignupPage = () => {
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
            <SignupForm />
          </div>
          <div className="mb-24 font-poppins text-label-sm lg:text-label-md">
            <span className="text-light-text text-grey-neutral50">
              Already a member?{' '}
            </span>
            <span className="underline">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
