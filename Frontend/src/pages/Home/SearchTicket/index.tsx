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
import { useState } from "react";
import { MobileDatePickerController } from "shared/components/forms/MobileDatePickerController";
import Spin from "shared/components/Spin";
import { ENDPOINT } from "shared/constants/endpoints";
import { convertDateFormatInUS } from "shared/utils/date/convert-date-br-to-usa";

export const SearchTicket = ({ setTickets }: { setTickets: Function }) => {
  const initialValues = {
    destination_city: "",
    home_city: "",
    dt_arrival: new Date("11-06-2022"),
    dt_output: new Date("10-31-2022"),
  };

  const [fetching, setFetching] = useState(false);

  const cidades = ["Manaus", "Coari", "Tabatinga"];

  const {
    control,
    getValues,
    formState: { isValid, errors },
  } = useForm<IGetTicketFilter>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(getTicketFilterValidationSchema),
  });

  const searchTicket = async () => {
    const dt_arrival = convertDateFormatInUS(
      new Date(getValues().dt_arrival).toLocaleDateString()
    );
    const dt_output = convertDateFormatInUS(
      new Date(getValues().dt_output).toLocaleDateString()
    );

    const data = { ...getValues(), dt_arrival, dt_output };

    const tickets = await ENDPOINT.GET_TICKET(data);

    setFetching(false);

    setTickets(tickets);
  };

  if (fetching) {
    return <Spin />;
  }

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
                  formControlName={"dt_output"}
                  label={"Data inicial"}
                  error={errors.dt_output}
                />
                <SvgIcon component={KeyboardArrowRight} />
                <MobileDatePickerController
                  register
                  formControl={control}
                  formControlName={"dt_arrival"}
                  label={"Data final"}
                  error={errors.dt_arrival}
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
