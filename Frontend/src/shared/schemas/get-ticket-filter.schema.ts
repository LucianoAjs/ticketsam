import yup from "shared/schemas/yup-helper";

export const getTicketFilterValidationSchema = yup.object().shape({
  destination_city: yup.string().required(),
  home_city: yup.string().required(),
  dt_arrival: yup.date().required(),
  dt_output: yup
    .date()
    .required()
    .min(
      yup.ref("dt_arrival"),
      "A data final deve ser maior que a data inicial"
    ),
});
