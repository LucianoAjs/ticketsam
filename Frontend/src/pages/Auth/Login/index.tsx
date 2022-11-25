import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NextButton } from "shared/components/buttons";
import { InputFormController } from "shared/components/forms/InputFormController";
import Spin from "shared/components/Spin";
import { TOKEN } from "shared/constants/common";
import { ENDPOINT } from "shared/constants/endpoints";
import { AUTH, CREATE_ACCOUNT, HOME } from "shared/constants/routes";
import { ILoginForm } from "shared/interfaces/auth-interface";
import { login } from "shared/schemas/login.schema";
import { setDataStorage } from "shared/utils";
import Container, { CardContainer, ContainerStyled } from "../styles";

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

export const Login = () => {
  const initState = {
    email: "",
    password: "",
  };

  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(false);

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

  function onChange(value: any) {
    setCaptcha(RECAPTCHA_SITE_KEY ? value : true);
  }

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
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY || ""} onChange={onChange} />
        </ContainerStyled>

        <NextButton
          disabled={!isValid || !captcha}
          handleClick={onSubmit}
          text="Iniciar sessão"
        />

        <h6>Nao tem uma conta?</h6>

        <a href={`/${AUTH}/${CREATE_ACCOUNT}`}>
          Clique aqui para criar um conta.
        </a>
      </CardContainer>
    </Container>
  );
};
