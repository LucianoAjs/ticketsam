import { yupResolver } from "@hookform/resolvers/yup";
import ptBR from "dayjs/locale/pt-br";
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
import { useCallback, useEffect, useState } from "react";

import { MobileDatePickerController } from "shared/components/forms/MobileDatePickerController";
import Spin from "shared/components/Spin";
import { ENDPOINT } from "shared/constants/endpoints";
import { LOCALE_TEXT } from "shared/constants/locale-text.constant";
import { convertDateFormat } from "shared/utils/date/date-format";

export const SearchTicket = ({ setTickets }: { setTickets: Function }) => {
  const [states, setStates] = useState<string[]>([]);

  const initialValues = {
    destination_city: "",
    home_city: "",
    dt_arrival: new Date(),
    dt_output: new Date(),
  };

  const [fetching, setFetching] = useState(false);

  const getAllState = useCallback(async () => {
    const { data } = await ENDPOINT.GET_PLACE_NAMES();

    setStates(data);
  }, []);

  useEffect(() => {
    getAllState();
  }, [getAllState]);

  const {
    control,
    getValues,
    watch,
    formState: { isValid, errors },
  } = useForm<IGetTicketFilter>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(getTicketFilterValidationSchema),
  });

  const searchTicket = async () => {
    const dt_arrival = convertDateFormat(new Date(getValues().dt_arrival));
    const dt_output = convertDateFormat(new Date(getValues().dt_output));

    const dataFilter = { ...getValues(), dt_arrival, dt_output };

    const { data } = await ENDPOINT.GET_TICKET(dataFilter);

    setTickets(data);

    setFetching(false);
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <Container>
      <h2>Bem vindo! Procure sua passagem de barco agora mesmo.</h2>
      <CardStyled>
        <AlignGap>
          <AlignColumn>
            <SelectFormController
              register
              formControl={control}
              formControlName={"home_city"}
              label={"Origem"}
              defaultValues={states}
              error={errors.home_city}
            />
            <SelectFormController
              register
              formControl={control}
              formControlName={"destination_city"}
              label={"Destino"}
              defaultValues={states.filter((v) => watch().home_city !== v)}
              error={errors.destination_city}
            />
          </AlignColumn>

          <AlignColumnDate>
            <LocalizationProvider
              locale={ptBR}
              adapterLocale={ptBR}
              dateAdapter={AdapterDayjs}
              localeText={{ ...LOCALE_TEXT }}
            >
              <Align>
                <MobileDatePickerController
                  register
                  formControl={control}
                  formControlName={"dt_output"}
                  label={"Data de ida"}
                  minDate={new Date()}
                  error={errors.dt_output}
                />
                <SvgIcon component={KeyboardArrowRight} />
                <MobileDatePickerController
                  register
                  formControl={control}
                  formControlName={"dt_arrival"}
                  label={"Data de volta"}
                  minDate={new Date(getValues().dt_output)}
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
