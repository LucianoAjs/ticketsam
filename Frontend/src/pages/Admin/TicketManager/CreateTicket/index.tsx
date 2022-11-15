import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AlignButtons } from "pages/Admin/BoatManager/Selfie/styles";
import { ContainerStyled } from "pages/Auth/styles";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BackButton, NextButton } from "shared/components/buttons";
import { InputFormController } from "shared/components/forms/InputFormController";
import { MobileDatePickerController } from "shared/components/forms/MobileDatePickerController";
import { SelectFormController } from "shared/components/forms/SelectFormController";
import Spin from "shared/components/Spin";
import { CURRENCY_FORMATTER } from "shared/constants/common";
import { ENDPOINT } from "shared/constants/endpoints";
import { initialStateCreateTicket } from "shared/constants/inital-state-content/initial-state-create-ticket";
import useUserContext from "shared/contexts/UserContext/userContext";
import { MaskCustom } from "shared/enums/mask-custom";
import { IBoat } from "shared/interfaces/boat.interface";
import { ICreateTicket } from "shared/interfaces/create-ticket.interface";
import { createTicketValidationSchema } from "shared/schemas/create-ticket.schema";
import { compact } from "shared/utils";
import { convertDateFormat } from "shared/utils/date/date-format";
import { CardContainer } from "./styles";

export const CreateTicket = ({ setOpen }: { setOpen: Function }) => {
  const { boat, update } = useUserContext();
  const [initialValues] = useState<ICreateTicket>(initialStateCreateTicket);
  const [boatName, setBoatName] = useState<string[]>([""]);
  const [boats, setBoats] = useState<IBoat[]>(boat);
  const [fetching, setFetching] = useState(false);

  const getDataBoat = useCallback(async () => {
    const { data } = await ENDPOINT.GET_BOAT();

    await update({ boat: data }, "UPDATE_BOAT");

    setBoats(data);
  }, [update]);

  useEffect(() => {
    if (Object.values(compact(boat)).length === 0) {
      getDataBoat();
    }
  }, [boat, getDataBoat]);

  const setBoatNames = useCallback(() => {
    const boatsValues = boats.map((boat) => {
      return boat.name;
    });
    setBoatName(boatsValues);
  }, [boats]);

  useEffect(() => {
    setBoatNames();
  }, [setBoatNames]);

  const {
    control,
    getValues,
    formState: { isValid, errors },
  } = useForm<ICreateTicket>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(createTicketValidationSchema),
  });

  const onSubmit = async () => {
    setFetching(true);

    const chooseBoat = boats.find((v) => v.name === getValues().boat_name);
    const dt_arrival = convertDateFormat(new Date(getValues().dt_arrival));
    const dt_output = convertDateFormat(new Date(getValues().dt_output));

    await ENDPOINT.CREATE_TICKET(chooseBoat?.id || "", {
      ...getValues(),
      dt_arrival,
      dt_output,
      remaining_quantity: Number(getValues().remaining_quantity),
      transport_value:
        Number(String(getValues().transport_value).replace(/[^0-9.-]+/g, "")) /
        CURRENCY_FORMATTER,
      food_value:
        Number(String(getValues().food_value).replace(/[^0-9.-]+/g, "")) /
        CURRENCY_FORMATTER,
    });

    setFetching(false);
    setOpen(false);
    window.location.reload();
  };

  if (fetching) {
    return <Spin />;
  }
  console.log(errors);
  return (
    <CardContainer>
      <h2>Dados do barco</h2>
      <ContainerStyled>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs="auto" lg="12">
              <Row xs="auto">
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="accommodation_name"
                    label="Nome da acomodação"
                    error={errors?.accommodation_name}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <SelectFormController
                    register
                    formControl={control}
                    formControlName="boat_name"
                    label="Nome do barco"
                    error={errors?.boat_name}
                    defaultValues={boatName}
                  />
                </Col>

                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="destination_city"
                    label="Cidade destino"
                    error={errors?.destination_city}
                  />
                </Col>

                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="home_city"
                    label="Cidade partida"
                    error={errors?.home_city}
                  />
                </Col>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Col xs="12" sx="6" md="6" lg="6">
                    <MobileDatePickerController
                      register
                      formControl={control}
                      formControlName={"dt_output"}
                      label={"Data saida"}
                      error={errors.dt_output}
                    />
                  </Col>
                  <Col xs="12" sx="6" md="6" lg="6">
                    <MobileDatePickerController
                      register
                      formControl={control}
                      formControlName={"dt_arrival"}
                      label={"Data chegada"}
                      error={errors.dt_arrival}
                    />
                  </Col>
                </LocalizationProvider>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="boat_phone"
                    label="Numero do barco"
                    error={errors?.boat_phone}
                    mask="(00)00000-0000"
                    placeholder="(__)_____-____"
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="food_value"
                    label="Valor da comida"
                    error={errors?.food_value}
                    maskType={MaskCustom.NumberMaskCustom}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="transport_value"
                    label="Valor do transporte"
                    error={errors?.transport_value}
                    maskType={MaskCustom.NumberMaskCustom}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="remaining_quantity"
                    label="Quantidade de bilhetes"
                    error={errors?.remaining_quantity}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </ContainerStyled>
      <AlignButtons>
        <BackButton
          key="back-button"
          text="Voltar"
          handleClick={() => setOpen(false)}
        />
        <NextButton
          key="next-button"
          text="Prosseguir"
          disabled={!isValid}
          handleClick={onSubmit}
        />
      </AlignButtons>
    </CardContainer>
  );
};
