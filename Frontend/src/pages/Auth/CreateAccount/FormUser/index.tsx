import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NextButton } from "shared/components/buttons";
import { BackButton } from "shared/components/buttons/BackButton";
import { InputFormController } from "shared/components/forms/InputFormController";
import { SelectFormController } from "shared/components/forms/SelectFormController";
import { AUTH } from "shared/constants/routes";
import useUserContext from "shared/contexts/UserContext/userContext";
import { Gender } from "shared/enums/gender.enum";
import { IUser } from "shared/interfaces/user-interface";
import { userValidationSchema } from "shared/schemas/user.schema";
import { AlignButtons } from "styles/app-styles";
import { CardContainer, ContainerStyled } from "../../styles";

export const FormUser = ({ next }: { next: Function }) => {
  const { update, user } = useUserContext();

  const [initialValues, setInitialValues] = useState(user);

  useEffect(() => {
    if (user) {
      setInitialValues(user);
    }
  }, [user]);

  const {
    register,
    control,
    getValues,
    formState: { isValid, errors },
  } = useForm<Partial<IUser>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(userValidationSchema),
  });

  const onSubmit = () => {
    const data = getValues();

    update({
      user: data,
    });
    next();
  };

  return (
    <CardContainer>
      <h2>Dados do usuário</h2>
      <ContainerStyled>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs="auto" lg="6">
              <Row xs="auto">
                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    formControl={control}
                    formControlName="firstName"
                    register={register}
                    label="Nome"
                    error={errors.firstName}
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    formControl={control}
                    formControlName="lastName"
                    register={register}
                    label="Último nome"
                    error={errors.lastName}
                  />
                </Col>
                <Col xs="12" sx="6" md="12" lg="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="email"
                    label="E-mail"
                    error={errors.email}
                  />
                </Col>
                <Col xs="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="password"
                    label="Senha"
                    error={errors.password}
                    inputType={"password"}
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
                    formControlName="phoneNumber"
                    label="Telefone"
                    error={errors.phoneNumber}
                    mask="(00)00000-0000"
                    placeholder="(__)_____-____"
                  />
                </Col>
                <Col xs="12" sx="6" md="6" lg="12">
                  <InputFormController
                    register
                    formControl={control}
                    formControlName="cpf"
                    label="CPF"
                    error={errors.cpf}
                    mask="000.000.000-00"
                    placeholder="___.___.___-__"
                  />
                </Col>
                <Col xs="12" sx="6" md="12" lg="12">
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
                <Col xs="12" sx="6" md="12" lg="12">
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
          </Row>
        </Container>
      </ContainerStyled>
      <AlignButtons>
        <BackButton key="back-button" text="Voltar" redirectTo={`/${AUTH}`} />
        <NextButton
          key="next-button"
          text="Prosseguir"
          handleClick={onSubmit}
          disabled={!isValid}
        />
      </AlignButtons>
    </CardContainer>
  );
};
