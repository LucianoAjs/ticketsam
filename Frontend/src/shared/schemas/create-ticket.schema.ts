import yup from "shared/schemas/yup-helper";

export const createTicketValidationSchema = yup.object().shape({
  accommodation_name: yup.string().required(),
  destination_city: yup.string().required(),
  home_city: yup.string().required(),
  dt_output: yup.date().required(),
  dt_arrival: yup
    .date()
    .required()
    .min(
      yup.ref("dt_output"),
      "A data final deve ser maior que a data inicial"
    ),
  boat_name: yup.string().required(),
  boat_phone: yup
    .string()
    .required()
    .matches(/^\(\d{2}\)(?:[2-8]|9[1-9])\d{3}-\d{4}$/, "Telefone inválido."),
  remaining_quantity: yup.number().required(),
  food_value: yup.string().required(),
  transport_value: yup.string().required(),
});
