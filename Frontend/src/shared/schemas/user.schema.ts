import yup from "shared/schemas/yup-helper";
import { parseDateString } from "shared/utils/date";

export const userValidationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^\(\d{2}\)(?:[2-8]|9[1-9])\d{3}-\d{4}$/, "Telefone inválido."),
  cpf: yup
    .string()
    .required("CPF inválido")
    .matches(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}/, "CPF inválido.")
    .typeError("O campo CPF é obrigatório."),
  gender: yup.string().required(),
  birthdate: yup
    .date()
    .transform(parseDateString)
    .required()
    .typeError("Digite uma data valida."),
});
