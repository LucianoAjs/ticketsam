import { NextButton } from "shared/components/buttons";

import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputFormController } from "shared/components/forms/InputFormController";
import Spin from "shared/components/Spin";
import { TOKEN } from "shared/constants/common";
import { ENDPOINT } from "shared/constants/endpoints";
import { AUTH, CREATE_ACCOUNT, HOME } from "shared/constants/routes";
import { ILoginForm } from "shared/interfaces/auth-interface";
import { login } from "shared/schemas/login.schema";
import { setDataStorage } from "shared/utils";
import Container, { CardContainer, ContainerStyled } from "../styles";

export const Login = () => {
  const initState = {
    email: "",
    password: "",
  };

  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    register,
    getValues,
    formState: { isValid, errors },
  } = useForm<ILoginForm>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: initState,
    resolver: yupResolver(login),
  });
  const loginAccount = useCallback(async () => {
    setFetching(true);

    const {
      data: { access_token },
    } = await ENDPOINT.LOGIN(getValues());

    setDataStorage(TOKEN, access_token);

    navigate(`${HOME}`);

    setFetching(false);
  }, [getValues, navigate]);

  const onSubmit = () => {
    loginAccount();
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <Container>
      <CardContainer>
        <h5>Login</h5>

        <ContainerStyled>
          <InputFormController
            formControl={control}
            formControlName={"email"}
            label={"Usuário"}
            error={errors.email}
            register={register}
            inputType={"text"}
          />
          <InputFormController
            formControl={control}
            formControlName={"password"}
            label={"Senha"}
            error={errors.password}
            register={register}
            inputType={"password"}
          />
        </ContainerStyled>

        <NextButton
          disabled={!isValid}
          handleClick={onSubmit}
          text="Iniciar sessão"
        />

        <h5>Nao tem uma conta?</h5>

        <a href={`/${AUTH}/${CREATE_ACCOUNT}`}>
          Clique aqui para criar um conta.
        </a>
      </CardContainer>
    </Container>
  );
};
