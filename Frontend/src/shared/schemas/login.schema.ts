import yup from "shared/schemas/yup-helper";

export const login = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});
