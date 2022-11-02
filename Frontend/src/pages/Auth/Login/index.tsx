import { NextButton } from "shared/components/buttons";

import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputFormController } from "shared/components/forms/InputFormController";
import Spin from "shared/components/Spin";
import { TOKEN } from "shared/constants/common";
import { ENDPOINT } from "shared/constants/endpoints";
import {
  AUTH,
  CREATE_ACCOUNT,
  HOME,
  RECOVERY_PASSWORD,
} from "shared/constants/routes";
import { ILoginForm } from "shared/interfaces/auth-interface";
import { login } from "shared/schemas/login.schema";
import { setDataStorage } from "shared/utils";
import {
  AlignCheckBox,
  AlignInput,
  AlignItems,
  AlignRecPassword,
  HaveAccount,
  Main,
} from "../styles";

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

    try {
      const {
        data: { access_token },
      } = await ENDPOINT.LOGIN(getValues());

      setDataStorage(TOKEN, access_token);

      navigate(HOME);
    } catch (error) {
      // TODO: Implement error sreen
    }

    setFetching(false);
  }, [getValues, navigate]);

  const onSubmit = () => {
    loginAccount();
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <Main>
      <AlignItems>
        <div>
          <h1>UNKNOWN</h1>
          <br />
          <h5>Login</h5>
        </div>

        <AlignInput>
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
        </AlignInput>

        <NextButton
          disabled={!isValid}
          handleClick={onSubmit}
          text="Iniciar sessão"
        />

        <AlignRecPassword>
          <a href={`/${AUTH}/${RECOVERY_PASSWORD}`}>Esqueci minha senha</a>
        </AlignRecPassword>

        <HaveAccount>
          <h4>Nao tem uma conta?</h4>
        </HaveAccount>

        <AlignCheckBox>
          <a href={`/${AUTH}/${CREATE_ACCOUNT}`}>
            Clique aqui para criar um conta.
          </a>
        </AlignCheckBox>
      </AlignItems>
    </Main>
  );
};
