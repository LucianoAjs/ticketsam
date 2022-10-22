import yup from 'shared/schemas/yup-helper';

export const recoveryPassword = yup.object().shape({
  email: yup.string().required().email(),
  emailConfimation: yup
    .string()
    .required()
    .email()
    .oneOf([yup.ref('email'), null], 'E-mail deve corresponder'),
});
