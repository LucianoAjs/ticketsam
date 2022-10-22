/* eslint-disable no-template-curly-in-string */
import * as Yup from "yup";

Yup.setLocale({
  string: {
    email: "E-mail inválido.",
    min: "Campo deve conter no mínimo ${min} caracteres.",
    max: "Campo deve conter no máximo ${max} caracteres.",
  },
  mixed: {
    required: "Este campo é obrigatório.",
    default: "Este campo é obrigatório.",
  },
});

export default Yup;
