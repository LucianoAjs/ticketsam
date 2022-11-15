import yup from "shared/schemas/yup-helper";

export const boatValidationSchema = yup.object().shape({
  cnpj: yup
    .string()
    .required()
    .matches(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/, "CNPJ inválido."),
  IMO: yup.number().required(),
  name: yup.string().required(),
  subscription: yup.number().required(),
  flag: yup.string().required(),
});
