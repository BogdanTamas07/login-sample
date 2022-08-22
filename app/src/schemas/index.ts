import * as Yup from 'yup';

export const registrationValidationSchema = () =>
  Yup.object().shape({
    username: Yup.string()
      .test(
        'len',
        'The username must be between 3 and 20 characters.',
        (val: any) => val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required('This field is required!'),
    email: Yup.string().email('This is not a valid email.').required('This field is required!'),
    password: Yup.string()
      .test(
        'len',
        'The password must be between 6 and 40 characters.',
        (val: any) => val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required('This field is required!')
  });

export const loginValidationSchema = () => {
  return Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!')
  });
};

export const itemValidationSchema = () => {
  return Yup.object().shape({
    userText: Yup.string().required('This field is required!')
  });
};

export const resetPasswordValidationSchema = () => {
  return Yup.object().shape({
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
};

export const forgotPasswordValidationSchema = () => {
  return Yup.object().shape({
    email: Yup.string().email('This is not a valid email.').required('This field is required!')
  });
};
