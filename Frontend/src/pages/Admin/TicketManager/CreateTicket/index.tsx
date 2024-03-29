import { yupResolver } from "@hookform/resolvers/yup";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { BackButton, NextButton } from "components/buttons";
import { InputFormController } from "components/forms/InputFormController";
import { MobileDatePickerController } from "components/forms/MobileDatePickerController";
import { SelectFormController } from "components/forms/SelectFormController";
import Spin from "components/Spin";
import useUserContext from "contexts/UserContext/userContext";
import ptBR from "dayjs/locale/pt-br";
import { AlignButtons } from "pages/Admin/BoatManager/CreateBoatSteps/Selfie/styles";
import { ContainerStyled } from "pages/Auth/styles";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { userSellerService } from "services/user.seller.service";
import { CURRENCY_FORMATTER } from "shared/constants/common";
import { initialStateCreateTicket } from "shared/constants/inital-state-content/initial-state-create-ticket";
import { LOCALE_TEXT } from "shared/constants/locale-text.constant";
import { BoatStatus } from "shared/enums/boat-status.enum";
import { MaskCustom } from "shared/enums/mask-custom";
import { IBoat } from "shared/interfaces/boat.interface";
import { ICreateTicket } from "shared/interfaces/create-ticket.interface";
import { createTicketValidationSchema } from "shared/schemas/create-ticket.schema";
import { compact } from "shared/utils";
import { CardContainer } from "./styles";

export const CreateTicket = ({ setOpen }: { setOpen: Function }) => {
  const { boat, update } = useUserContext();
  const [initialValues] = useState<ICreateTicket>(initialStateCreateTicket);
  const [boatName, setBoatName] = useState<string[]>([""]);
  const [boats, setBoats] = useState<IBoat[]>(boat);
  const [fetching, setFetching] = useState(false);

  const getDataBoat = useCallback(async () => {
    const { data } = await userSellerService.BOAT.GET_BOAT();

    await update({ boat: data }, "UPDATE_BOAT");

    setBoats(data);
  }, [update]);

  useEffect(() => {
    if (Object.values(compact(boat)).length === 0) {
      getDataBoat();
    }
  }, [boat, getDataBoat]);

  const setBoatNames = useCallback(() => {
    const boatsValues = boats
      .filter((boat: IBoat) => boat.status.status === BoatStatus.APPROVED)
      .map((boat: IBoat) => {
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

    const chooseBoat = boats.find(
      (v) =>
        v.name === getValues().boat_name &&
        v.status.status === BoatStatus.APPROVED
    );

    await userSellerService.TICKET.CREATE_TICKET(chooseBoat?.id || "", {
      ...getValues(),
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
  return (
    <CardContainer>
      <h2>Dados do bilhete</h2>
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

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  locale={ptBR}
                  adapterLocale={ptBR}
                  localeText={{ ...LOCALE_TEXT }}
                >
                  <Col xs="12" sx="6" md="6" lg="6">
                    <MobileDatePickerController
                      register
                      formControl={control}
                      formControlName={"dt_output"}
                      label={"Data saida"}
                      minDate={new Date()}
                      error={errors.dt_output}
                    />
                  </Col>
                  <Col xs="12" sx="6" md="6" lg="6">
                    <MobileDatePickerController
                      register
                      formControl={control}
                      formControlName={"dt_arrival"}
                      label={"Data chegada"}
                      minDate={new Date(getValues().dt_output)}
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
