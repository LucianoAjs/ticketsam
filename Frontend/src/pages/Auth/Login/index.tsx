import { NextButton } from "shared/components/buttons";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { InputFormController } from "shared/components/forms/InputFormController";
import {
  AUTH,
  CREATE_ACCOUNT,
  RECOVERY_PASSWORD,
} from "shared/constants/routes";
import { ILoginForm } from "shared/interfaces/auth-interface";
import { login } from "shared/schemas/login.schema";
import { AlignCheckBox, AlignInput, AlignItems, Main, HaveAccount, AlignRecPassword } from "../styles";

export const Login = () => {
  const initState = {
    user: "",
    password: "",
    saveData: false,
  };

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

  const onSubmit = () => {
    const { user, password } = getValues();
  };

  return (
    <Main>
      <AlignItems>
        <div>
          <h1>UNKNOWN</h1>
          <br />
          <h5>
            Login
          </h5>
        </div>

        <AlignInput>
          <InputFormController
            formControl={control}
            formControlName={"user"}
            label={"Usuário"}
            error={errors.user}
            register={register}
            inputImg={""}
            inputType={"text"}
            placeholder={"Email"}
          />
          <InputFormController
            formControl={control}
            formControlName={"password"}
            label={"Senha"}
            error={errors.password}
            register={register}
            inputImg={""}
            inputType={"password"}
            placeholder={"......"}
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

        <AlignCheckBox >
        <a href={`/${AUTH}/${CREATE_ACCOUNT}`}>Clique aqui para criar um conta.</a>
        </AlignCheckBox>

      </AlignItems>
    </Main>
  );
};
