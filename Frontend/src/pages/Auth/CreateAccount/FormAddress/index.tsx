import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BackButton, NextButton } from "shared/components/buttons";
import { InputFormController } from "shared/components/forms/InputFormController";
import { SelectFormController } from "shared/components/forms/SelectFormController";
import Spin from "shared/components/Spin";
import { BrazilStates } from "shared/constants/brazil-states";
import { ENDPOINT } from "shared/constants/endpoints";
import { AUTH } from "shared/constants/routes";
import useUserContext from "shared/contexts/UserContext/userContext";
import { IAddress } from "shared/interfaces/address";
import { addressValidationSchema } from "shared/schemas/address";
import { convertDateFormatBrToUs } from "shared/utils/date/convert-date-br-to-us";
import { AlignButtons } from "styles/app-styles";
import { CardContainer, ContainerStyled } from "../../styles";
export const FormAddress = ({ previous }: { previous: Function }) => {
  const { update, user } = useUserContext();

  const [initialValues, setInitialValues] = useState<IAddress>(user?.address);

  const navigate = useNavigate();

  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (user.address) {
      setInitialValues(user.address);
    }
  }, [user.address]);

  const {
    control,
    getValues,
    watch,
    setValue,
    formState: { isValid, errors },
  } = useForm<IAddress>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(addressValidationSchema),
  });

  const getDataCep = useCallback(async () => {
    const postalCode = getValues().postalCode;

    const data = await ENDPOINT.GET_CEP_DATA(
      postalCode.replace(".", "").replace("-", "")
    );

    if (data) {
      const {
        data: { bairro, complemento, localidade, logradouro, uf },
      } = data;

      setValue("state", uf);
      setValue("city", localidade);
      setValue("street", logradouro);
      setValue("complement", complemento);
      setValue("neighborhood", bairro);
    }
  }, [getValues, setValue]);

  const createAccount = useCallback(async () => {
    setFetching(true);

    const birthdate = convertDateFormatBrToUs(String(user.birthdate));

    user.birthdate = birthdate;

    await ENDPOINT.CREATE_USER(user);

    setFetching(false);
  }, [user]);

  const onSubmit = async () => {
    await update({
      user: {
        address: getValues(),
      },
    });

    await createAccount();

    navigate(`/${AUTH}`);
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <CardContainer>
      <h2>Endereço residencial</h2>
      <ContainerStyled>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs="auto" lg="6">
              <Row xs="auto">
                <Col xs="12">
                  <Row xs="12">
                    <Col xs="10">
                      <InputFormController
                        register
                        formControl={control}
                        formControlName="postalCode"
                        label="CEP"
                        error={errors?.postalCode}
                        mask="00.000-000"
                        placeholder="__.___-___"
                        inputImg=""
                      />
                    </Col>
                    <Col xs="1" sx="2" style={{ alignSelf: "center" }}>
                      <SearchIcon fontSize="medium" onClick={getDataCep} />
                    </Col>
                  </Row>
                </Col>

                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="city"
                    label="Cidade"
                    error={errors?.city}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="street"
                    label="Logradouro"
                    error={errors?.street}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="12">
                  <SelectFormController
                    register
                    formControl={control}
                    formControlName="state"
                    label="Estado"
                    error={errors?.state}
                    defaultValues={BrazilStates}
                  />
                </Col>
              </Row>
            </Col>

            <Col xs="auto" lg="6">
              <Row xs="auto">
                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="complement"
                    label="Complemento"
                    error={errors?.complement}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="number"
                    label="Número"
                    error={errors?.number}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="neighborhood"
                    label="Bairro"
                    error={errors?.neighborhood}
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
          disabled={!isValid}
          key="next-button"
          text="Prosseguir"
          handleClick={onSubmit}
        />
      </AlignButtons>
    </CardContainer>
  );
};
