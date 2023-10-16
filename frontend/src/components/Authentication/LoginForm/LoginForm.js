/* eslint-disable no-unused-vars */
import { Button, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startLogin } from '../../../actions/auth';
import { loginFormSchema } from '../../../pages/Auth/constants';
import { validate } from '../../../utilities/validationHelper';
import '../AuthForm.scss';

const className = 'c-LoginForm';

const LoginForm = (props) => {
  let [form] = Form.useForm();
  const [errors, setErrors] = useState({});
  const login = async (values) => {
    const formData = { email: values?.email, password: values?.password };
    const isValid = await validate({
      schema: loginFormSchema,
      formData,
      setErrors
    });

    if (!isValid) {
      return;
    }

    const email = formData.email;
    const password = formData.password;
    props.dispatch(startLogin(email, password, props.currentRoute));
  };

  return (
    <div className={`${className}__form__wrapper`}>
      <Form
        form={form}
        name="Login"
        initialValues={{
          remember: true
        }}
        onFinish={login}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            },
            {
              type: 'email',
              message: 'Please enter a valid email'
            }
          ]}>
          <Input
            placeholder="Email"
            className={`${className}__email__input`}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              type: 'string',
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              message:
                'Password should be atleast 8 characters with at least one letter, one number and one special character'
            }
          ]}>
          <Input.Password
            placeholder="Password"
            className={`${className}__password__input`}
          />
        </Form.Item>
        <Row justify="center">
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form
                    .getFieldsError()
                    .filter(({ errors }) => errors.length).length
                }>
                Log in
              </Button>
            )}
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentRoute: state.routes.currentRoute,
  loading: state.main.loading,
  loginFailed: state.main.loginFailed
});

export default connect(mapStateToProps)(withRouter(LoginForm));
