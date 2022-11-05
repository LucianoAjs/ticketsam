import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SelectFormController } from "shared/components/forms/SelectFormController";
import { IGetTicketFilter } from "shared/interfaces/get-ticket-filter.interface";
import { getTicketFilterValidationSchema } from "shared/schemas/get-ticket-filter.schema";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { NextButton } from "shared/components/buttons";
import Container, {
  Align,
  AlignButton,
  AlignColumn,
  AlignColumnDate,
  AlignGap,
  CardStyled,
} from "./styles";

import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { SvgIcon } from "@mui/material";
import { MobileDatePickerController } from "shared/components/forms/MobileDatePickerController";

export const SearchTicket = () => {
  const initialValues = {
    destination_city: "",
    home_city: "",
    dt_arrival: new Date(),
    dt_output: new Date(),
  };

  const cidades = ["Manaus", "Coari"];

  const {
    control,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IGetTicketFilter>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(getTicketFilterValidationSchema),
  });

  const searchTicket = () => {
    const { destination_city, dt_arrival, dt_output, home_city } = getValues();
  };

  return (
    <Container>
      <h1>Bem vindo! Procure sua passagem de barco agora mesmo.</h1>
      <CardStyled>
        <AlignGap>
          <AlignColumn>
            <SelectFormController
              register
              formControl={control}
              formControlName={"home_city"}
              label={"Origem"}
              defaultValues={cidades}
              error={errors.home_city}
            />
            <SelectFormController
              register
              formControl={control}
              formControlName={"destination_city"}
              label={"Destino"}
              defaultValues={cidades}
              error={errors.destination_city}
            />
          </AlignColumn>

          <AlignColumnDate>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Align>
                <MobileDatePickerController
                  register
                  formControl={control}
                  formControlName={"dt_arrival"}
                  label={"Data inicial"}
                  error={errors.dt_arrival}
                />
                <SvgIcon component={KeyboardArrowRight} />
                <MobileDatePickerController
                  register
                  formControl={control}
                  formControlName={"dt_output"}
                  label={"Data final"}
                  error={errors.dt_output}
                />
              </Align>
            </LocalizationProvider>

            <h6>Informe entre quais dias você deseja iniciar sua viagem.</h6>
          </AlignColumnDate>
        </AlignGap>
        <AlignButton>
          <NextButton
            disabled={!isValid}
            handleClick={searchTicket}
            icon={false}
            text="Buscar passagens"
          />
        </AlignButton>
      </CardStyled>
    </Container>
  );
};
