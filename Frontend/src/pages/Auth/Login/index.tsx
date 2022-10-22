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
import { AlignCheckBox, AlignInput, AlignItems, Main } from "../styles";

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
          <h1>Bem vindo ao Unknown</h1>
          <h5>
            Insira suas credenciais nos campos abaixo <br />
            para iniciar a sessão:
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

        <AlignCheckBox>
          <a href={`/${AUTH}/${CREATE_ACCOUNT}`}>Criar conta</a>

          <a href={`/${AUTH}/${RECOVERY_PASSWORD}`}>Recuperar senha</a>
        </AlignCheckBox>

        <NextButton
          disabled={!isValid}
          handleClick={onSubmit}
          text="Iniciar sessão"
        />
      </AlignItems>
    </Main>
  );
};
