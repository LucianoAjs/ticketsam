import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { InputFormController } from "shared/components/forms/InputFormController";
import { SelectFormController } from "shared/components/forms/SelectFormController";
import { BrazilStates } from "shared/constants/brazil-states";
import { ENDPOINT } from "shared/constants/endpoints";
import useUserContext from "shared/contexts/UserContext/userContext";
import { Gender } from "shared/enums/gender.enum";
import { IUser } from "shared/interfaces/user-interface";
import { userValidationSchema } from "shared/schemas/user.schema";
import { convertDateFormatInUS } from "shared/utils/date/convert-date-br-to-usa";
import CardContainer, { CardStyled } from "./styles";
export const ProfileManager = () => {
  const { update, user } = useUserContext();

  const [initialValues, setInitialValues] = useState(user);
  const [dataEdit, setDataEdit] = useState(false);

  useEffect(() => {
    if (user) {
      setInitialValues(user);
    }
  }, [user]);

  const {
    register,
    control,
    getValues,
    formState: { isValid, isDirty, errors },
  } = useForm<Partial<IUser>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(userValidationSchema),
  });

  const updateUserInformation = async (dataUser: Partial<IUser>) => {
    await ENDPOINT.UPDATE_USER(dataUser);
  };

  const onSubmit = () => {
    const data = getValues();
    update({
      user: data,
    });

    const birthdate = convertDateFormatInUS(String(user.birthdate));
    data.birthdate = birthdate;

    const { password, cpf, ...rest } = data;

    updateUserInformation(rest);
    setDataEdit(false);
  };
  return (
    <CardContainer>
      <h2>Meu Perfil</h2>
      <CardStyled style={{ pointerEvents: dataEdit ? "unset" : "none" }}>
        <Container fluid>
          <h2>Dados do usuário</h2>
          <Row className="justify-content-md-center">
            <Col xs="auto" lg="12">
              <Row xs="auto" lg="12">
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    formControl={control}
                    formControlName="firstName"
                    register={register}
                    label="Nome"
                    error={errors.firstName}
                  />
                </Col>
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    formControl={control}
                    formControlName="lastName"
                    register={register}
                    label="Último nome"
                    error={errors.lastName}
                  />
                </Col>
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="email"
                    label="E-mail"
                    error={errors.email}
                  />
                </Col>
              </Row>
              <Row xs="auto" lg="12">
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="phoneNumber"
                    label="Telefone"
                    error={errors.phoneNumber}
                    mask="(00)00000-0000"
                    placeholder="(__)_____-____"
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="6">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="birthdate"
                    label="Data de nascimento"
                    error={errors.birthdate}
                    mask="00/00/0000"
                    placeholder="DD/MM/AAAA"
                  />
                </Col>
              </Row>
            </Col>
            <Col xs="11" sm="11" md="6">
              <Row xs="auto" lg="12">
                <SelectFormController
                  formControl={control}
                  formControlName="gender"
                  label="Gênero"
                  register={register}
                  error={errors.gender}
                  defaultValues={Gender}
                  enumType={true}
                />
              </Row>
            </Col>

            <h2>Endereço residencial</h2>
            <Col xs="auto" lg="12">
              <Row xs="auto" lg="12">
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="address.postalCode"
                    label="CEP"
                    error={errors?.address?.postalCode}
                    mask="00.000-000"
                    placeholder="__.___-___"
                  />
                </Col>
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="address.city"
                    label="Cidade"
                    error={errors?.address?.city}
                  />
                </Col>

                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="address.street"
                    label="Logradouro"
                    error={errors?.address?.street}
                  />
                </Col>
              </Row>
              <Row xs="auto" lg="12">
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="address.complement"
                    label="Complemento"
                    error={errors?.address?.complement}
                  />
                </Col>
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="address.number"
                    label="Número"
                    error={errors?.address?.number}
                  />
                </Col>
                <Col xs="12" sx="4" md="4" lg="4">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="address.neighborhood"
                    label="Bairro"
                    error={errors?.address?.neighborhood}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs="11" sm="11" md="6">
              <Row xs="auto" lg="12">
                <SelectFormController
                  register
                  formControl={control}
                  formControlName="address.state"
                  label="Estado"
                  error={errors?.address?.state}
                  defaultValues={BrazilStates}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </CardStyled>
      <Container fluid>
        <Row>
          {dataEdit ? (
            <Col xs="12">
              <Row>
                <Col
                  xs={{ span: 4, offset: 1 }}
                  sx
                  md
                  lg={{ span: 3, offset: 5 }}
                >
                  <Button
                    onClick={() => setDataEdit(false)}
                    variant="outlined"
                    startIcon={<ClearIcon />}
                  >
                    Cancelar
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={!isValid || !isDirty}
                    onClick={() => onSubmit()}
                    variant="contained"
                    endIcon={<SaveAsIcon />}
                  >
                    Salvar Alterações
                  </Button>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col xs={{ offset: 4 }} sx md lg={{ offset: 10 }}>
              <Button
                onClick={() => setDataEdit(true)}
                variant="contained"
                endIcon={<EditIcon />}
              >
                Editar
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </CardContainer>
  );
};
