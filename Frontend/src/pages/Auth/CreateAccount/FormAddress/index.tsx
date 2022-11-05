import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
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
import { convertDateFormatInUS } from "shared/utils/date/convert-date-br-to-usa";
import { AlignButtons, AlignForm } from "styles/app-styles";

export const FormAddress = ({ previous }: { previous: Function }) => {
  const { update, user } = useUserContext();

  const [initialValues, setInitialValues] = useState<IAddress>(user.address);

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
    getFieldState,
    resetField,
    setValue,
    formState: { isValid, errors },
  } = useForm<IAddress>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: initialValues,
    resolver: yupResolver(addressValidationSchema),
  });

  // TODO: Implement get CEP
  const getDataCep = useCallback(async () => {
    const postalCode = watch("postalCode");
    const fieldState = getFieldState("postalCode");

    if (!postalCode || !fieldState.isTouched) {
      return;
    }

    setFetching(true);

    const data = await ENDPOINT.GET_CEP_DATA(
      postalCode.replace(".", "").replace("-", "")
    );

    if (data) {
      const {
        data: { bairro, cep, complemento, localidade, logradouro, uf },
      } = data;

      setValue("postalCode", cep);
      setValue("state", uf);
      setValue("city", localidade);
      setValue("street", logradouro);
      setValue("complement", complemento);
      setValue("neighborhood", bairro);
    }
    setFetching(false);
    resetField("postalCode");
  }, [getFieldState, resetField, setValue, watch]);

  const createAccount = useCallback(async () => {
    setFetching(true);

    const birthdate = convertDateFormatInUS(String(user.birthdate));
    const phoneNumber = Number(
      String(user.phoneNumber).substring(4, 14).replace("-", "")
    );

    user.birthdate = birthdate;
    user.phoneNumber = phoneNumber;

    await ENDPOINT.CREATE_ACCOUNT(user);

    setFetching(false);
  }, [user]);

  const onSubmit = async () => {
    await update({
      user: {
        address: getValues(),
      },
    });

    try {
      await createAccount();

      navigate(`/${AUTH}`);
    } catch (error) {
      // TODO: Implement error screen
    }
  };

  if (fetching) {
    return <Spin />;
  }

  return (
    <>
      <form>
        <h2>Endereço residencial</h2>
        <AlignForm>
          <InputFormController
            register
            formControl={control}
            formControlName="postalCode"
            label="CEP"
            error={errors?.postalCode}
            mask="00.000-000"
            placeholder="__.___-___"
          />
          <InputFormController
            register
            formControl={control}
            formControlName="city"
            label="Cidade"
            error={errors?.city}
          />
          <SelectFormController
            register
            formControl={control}
            formControlName="state"
            label="Estado"
            error={errors?.state}
            defaultValues={BrazilStates}
          />
          <InputFormController
            register
            formControl={control}
            formControlName="street"
            label="Logradouro"
            error={errors?.street}
          />
          <InputFormController
            register
            formControl={control}
            formControlName="number"
            label="Número"
            error={errors?.number}
          />
          <InputFormController
            register
            formControl={control}
            formControlName="complement"
            label="Complemento"
            error={errors?.complement}
          />
          <InputFormController
            register
            formControl={control}
            formControlName="neighborhood"
            label="Bairro"
            error={errors?.neighborhood}
          />
        </AlignForm>
      </form>

      <AlignButtons>
        <BackButton key="back-button" text="Voltar" handleClick={previous} />
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
