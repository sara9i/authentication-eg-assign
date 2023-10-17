/* eslint-disable no-unused-vars */
import { Button, Form, Input, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startSignUp } from '../../../actions/auth';
const className = 'c-SignupForm c-Form';

function SignupForm(props) {
  let [form] = Form.useForm();

  const signUp = (values) => {
    props.dispatch(
      startSignUp(
        values?.name,
        values?.email,
        values?.password,
        values?.cpassword
      )
    );
  };

  return (
    <div className={`${className}__form__wrapper`}>
      <Form
        form={form}
        name="Login"
        initialValues={{
          remember: true
        }}
        onFinish={signUp}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!'
            }
          ]}>
          <Input
            placeholder="Name"
            className={`${className}__email__input`}
          />
        </Form.Item>

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
        <Form.Item
          label="ConfirmPassword"
          name="cpassword"
          rules={[
            {
              required: true,
              message: 'Please Confirm your password!'
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
            placeholder="Confirm Password"
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
                Sign Up
              </Button>
            )}
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentRoute: state.routes.currentRoute,
  loading: state.main.loading,
  loginFailed: state.main.loginFailed,
  success: state.main.success
});

export default connect(mapStateToProps)(withRouter(SignupForm));
