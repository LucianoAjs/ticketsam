import yup from 'shared/schemas/yup-helper';

export const resetPassword = yup.object().shape({
  password: yup.string().required(),
  passwordConfimation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Password deve corresponder'),
});
