import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NextButton } from "shared/components/buttons";
import { BackButton } from "shared/components/buttons/BackButton";
import { InputFormController } from "shared/components/forms/InputFormController";
import { SelectFormController } from "shared/components/forms/SelectFormController";
import { HOME } from "shared/constants/routes";
import useUserContext from "shared/contexts/UserContext/userContext";
import { Gender } from "shared/enums/gender.enum";
import { IUser } from "shared/interfaces/user-interface";
import { userValidationSchema } from "shared/schemas/user.schema";
import { AlignButtons, AlignForm, AlignLabelTerms } from "styles/app-styles";

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
    <>
      <form>
        <AlignForm>
          <h5>Primeiro, precisamos de algumas informacoes...</h5>
          <InputFormController
            formControl={control}
            formControlName="firstName"
            register={register}
            label="Nome"
            error={errors.firstName}
          />

          <InputFormController
            formControl={control}
            formControlName="lastName"
            register={register}
            label="Último nome"
            error={errors.lastName}
          />

          <InputFormController
            register
            formControl={control}
            formControlName="email"
            label="E-mail"
            error={errors.email}
          />
          <InputFormController
            register
            formControl={control}
            formControlName="phoneNumber"
            label="Telefone"
            error={errors.phoneNumber}
            mask="(00)00000-0000"
            placeholder="(__)_____-____"
          />
          <InputFormController
            register
            formControl={control}
            formControlName="cpf"
            label="CPF"
            error={errors.cpf}
            mask="000.000.000-00"
            placeholder="___.___.___-__"
          />
          <SelectFormController
            formControl={control}
            formControlName="gender"
            label="Gênero"
            register={register}
            error={errors.gender}
            defaultValues={Gender}
            enumType={true}
          />
          <InputFormController
            register
            formControl={control}
            formControlName="birthdate"
            label="Data de nascimento"
            error={errors.birthdate}
            mask="00/00/0000"
            placeholder="DD/MM/AAAA"
          />
        </AlignForm>

        <AlignLabelTerms>
          
        </AlignLabelTerms>
      </form>

      <AlignButtons>
        <BackButton key="back-button" text="Voltar" redirectTo={HOME} />
        <NextButton
          disabled={!isValid}
          key="next-button"
          text="Prosseguir"
          handleClick={onSubmit}
        />
      </AlignButtons>
    </>
  );
};
