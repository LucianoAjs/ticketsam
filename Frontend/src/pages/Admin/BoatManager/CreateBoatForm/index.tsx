import { yupResolver } from "@hookform/resolvers/yup";
import { ContainerStyled } from "pages/Auth/CreateAccount/styles";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { BackButton, NextButton } from "shared/components/buttons";
import { InputFormController } from "shared/components/forms/InputFormController";
import { SelectFormController } from "shared/components/forms/SelectFormController";
import Spin from "shared/components/Spin";
import { BrazilStates } from "shared/constants/brazil-states";
import { ENDPOINT } from "shared/constants/endpoints";
import { initialStateCreateBoat } from "shared/constants/inital-state-content/initial-state-create-boat";
import { IBoat } from "shared/interfaces/boat.interface";
import { boatValidationSchema } from "shared/schemas/boat";
import { AlignButtons } from "styles/app-styles";
import { CardContainer } from "./styles";

export const CreateBoatForm = ({
  previous,
  setOpen,
}: {
  previous: Function;
  setOpen: Function;
}) => {
  const [initialValues] = useState<IBoat>(initialStateCreateBoat);

  const [fetching, setFetching] = useState(false);

  const {
    control,
    getValues,
    formState: { isValid, errors },
  } = useForm<IBoat>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(boatValidationSchema),
  });

  const onSubmit = async () => {
    setFetching(true);
    const { IMO, cnpj, flag, name, subscription } = getValues();

    await ENDPOINT.CREATE_BOAT({
      cnpj,
      boat: {
        flag,
        name,
        subscription: Number(subscription),
        IMO: Number(IMO),
      },
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
                    formControlName="name"
                    label="Nome"
                    error={errors?.name}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="IMO"
                    label="IMO"
                    error={errors?.IMO}
                    mask="0000000"
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="cnpj"
                    label="CNPJ"
                    error={errors?.cnpj}
                    mask="00.000.000/0000-00"
                    placeholder="00.000.000/0000-00"
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <SelectFormController
                    register
                    formControl={control}
                    formControlName="flag"
                    label="Bandeira"
                    error={errors?.flag}
                    defaultValues={BrazilStates}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="subscription"
                    label="Incrição"
                    error={errors?.subscription}
                    mask="000000"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </ContainerStyled>
      <AlignButtons>
        <BackButton key="back-button" text="Voltar" handleClick={previous} />
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
