import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';

// eslint-disable-next-line no-unused-vars
const LoadingSpinner = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return <Spin indicator={antIcon} />;
};

export default LoadingSpinner;
