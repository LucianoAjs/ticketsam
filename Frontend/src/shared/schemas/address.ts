import yup from "shared/schemas/yup-helper";

export const addressValidationSchema = yup.object().shape({
  street: yup.string().required(),
  number: yup.string().required(),
  complement: yup.string(),
  neighborhood: yup.string().required(),
  postalCode: yup
    .string()
    .matches(/^\d{2}.?\d{3}-?\d{3}/, "CEP inválido.")
    .required(),
  city: yup.string().required(),
  state: yup.string().required(),
});
