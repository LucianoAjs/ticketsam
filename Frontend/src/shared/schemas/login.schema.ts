import yup from "shared/schemas/yup-helper";

export const login = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
});
