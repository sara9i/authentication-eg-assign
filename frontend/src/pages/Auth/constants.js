import * as yup from 'yup';

export const sideImageData = {
  alt: 'Sidebar Login',
  mobileImgData: {
    src: 'https://i0.wp.com/www.easygenerator.com/wp-content/uploads/2023/06/header_image_about-1.webp?fit=517%2C577&ssl=1',
    webpSrc:
      'https://i0.wp.com/www.easygenerator.com/wp-content/uploads/2023/06/header_image_about-1.webp?fit=517%2C577&ssl=1'
  },
  customImgClassname: 'h-full rounded-tl-4 rounded-bl-4'
};

export const login_logo = {
  alt: 'EG login',
  mobileImgData: {
    src: 'https://www.easygenerator.com/wp-content/themes/easygenerator/assets/images/logo.svg',
    webpSrc:
      'https://www.easygenerator.com/wp-content/themes/easygenerator/assets/images/logo.svg'
  }
};

export const loginBackground = {
  alt: 'login background',
  mobileImgData: {
    src: 'https://i0.wp.com/www.easygenerator.com/wp-content/uploads/2023/06/header_image_about-1.webp?fit=517%2C577&ssl=1',
    webpSrc:
      'https://i0.wp.com/www.easygenerator.com/wp-content/uploads/2023/06/header_image_about-1.webp?fit=517%2C577&ssl=1'
  }
};

export const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be in a valid format like “name@example.com”')
    .required('Email is required.'),
  password: yup.string().required('Password is required.')
});
