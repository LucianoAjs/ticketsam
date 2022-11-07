import yup from "shared/schemas/yup-helper";
import { parseDateString } from "shared/utils";

export const getTicketFilterValidationSchema = yup.object().shape({
  destination_city: yup.string().required(),
  home_city: yup.string().required(),
  dt_output: yup.date().required().transform(parseDateString),
  dt_arrival: yup
    .date()
    .required()
    .transform(parseDateString)
    .min(
      yup.ref("dt_output"),
      "A data final deve ser maior que a data inicial"
    ),
});
