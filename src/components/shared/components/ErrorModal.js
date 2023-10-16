import { Modal } from 'antd';

const ErrorModal = (props) => {
  return Modal.error({
    title: 'Something went wrong!',
    content: props.error
  });
};

export default ErrorModal;
