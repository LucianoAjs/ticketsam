import { yupResolver } from "@hookform/resolvers/yup";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Button } from "@mui/material";
import { InputFormController } from "components/forms/InputFormController";
import { SelectFormController } from "components/forms/SelectFormController";
import Spin from "components/Spin";
import useUserContext from "contexts/UserContext/userContext";
import { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { userSellerService } from "services/user.seller.service";
import { BrazilStates } from "shared/constants/brazil-states";

import { Gender } from "shared/enums/gender.enum";
import { IUser } from "shared/interfaces/user-interface";
import { userValidationSchema } from "shared/schemas/user.schema";
import { compact } from "shared/utils";
import { convertDateFormatBrToUs } from "shared/utils/date/convert-date-br-to-us";
import { convertDateFormatUsToBr } from "shared/utils/date/convert-date-us-to-br";

import CardContainer, { AlignRow, CardStyled } from "./styles";
export const ProfileManager = () => {
  const { update, user } = useUserContext();
  const [fetching, setFeching] = useState(false);
  const [initialValues, setInitialValues] = useState(user);
  const [dataEdit, setDataEdit] = useState(false);

  const {
    register,
    control,
    getValues,
    setValue,
    formState: { isValid, isDirty, errors },
  } = useForm<Partial<IUser>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(userValidationSchema),
  });

  const setDataForm = useCallback(
    (o: object) => {
      Object.keys(o).forEach((key: any, index: number) => {
        const property = Object.values(o)[index];
        if (new Date(property)) {
          setValue(key, new Date(property).toLocaleDateString());
        }
        setValue(key, property);
      });
    },
    [setValue]
  );

  const getDataUserInformation = useCallback(async () => {
    setFeching(true);
    const { data } = await userSellerService.USER.GET_USER_INFORMATION();
    delete data.boat;
    data.birthdate = convertDateFormatUsToBr(data.birthdate);

    await update({ user: data });

    setInitialValues(data);
    setDataForm(data);
    setFeching(false);
  }, [setDataForm, update]);

  useEffect(() => {
    if (Object.values(compact(user)).length > 0) {
      setInitialValues(user);
    } else {
      getDataUserInformation();
    }
  }, [getDataUserInformation, user]);

  const updateUserInformation = async (dataUser: Partial<IUser>) => {
    delete dataUser.boat;
    await userSellerService.USER.UPDATE_USER(dataUser);
  };

  const onSubmit = async () => {
    setFeching(true);
    setDataEdit(false);
    const data = getValues();

    update({
      user: data,
    });

    data.birthdate = convertDateFormatBrToUs(data.birthdate || "");

    const { password, cpf, DocumentType, createdAt, updatedAt, id, ...rest } =
      data;

    delete rest.address?.createdAt;
    delete rest.address?.id;
    delete rest.address?.updatedAt;
    delete rest.address?.userId;

    await updateUserInformation(rest);
    setFeching(false);
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <CardContainer>
      <Container fluid>
        <AlignRow>
          <h2>Meu Perfil</h2>
          <Row className="align-items-center">
            {dataEdit ? (
              <Col xs="12">
                <Row className="align-items-center">
                  <Col>
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
              <Col>
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
        </AlignRow>
      </Container>

      <CardStyled style={{ pointerEvents: dataEdit ? "unset" : "none" }}>
        <Container fluid>
          <h5>Dados do usuário</h5>
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
                <Col xs="12" sx="4" md="4" lg="4">
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
                <Col xs="12" sx="4" md="4" lg="4">
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
                <Col xs="12" sx="4" md="4" lg="4">
                  <SelectFormController
                    formControl={control}
                    formControlName="gender"
                    label="Gênero"
                    register={register}
                    error={errors.gender}
                    defaultValues={Gender}
                    enumType={true}
                  />
                </Col>
              </Row>
            </Col>

            <h5>Endereço residencial</h5>

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
                <Col xs="12" sx="4" md="4" lg="4">
                  <SelectFormController
                    register
                    formControl={control}
                    formControlName="address.state"
                    label="Estado"
                    error={errors?.address?.state}
                    defaultValues={BrazilStates}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </CardStyled>
    </CardContainer>
  );
};
