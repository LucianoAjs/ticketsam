import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { FormControlLabel, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";
import { Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { NumberFormatCustom } from "shared/components/fields/NumberFormatCustom";
import { MaskCustom } from "shared/enums/mask-custom";
import { AlignColumn } from "styles/app-styles";

interface IFormInput {
  formControl: any;
  formControlName: string;
  label: string;
  error: any;
  register: any;
  placeholder?: string;
  inputImg?: string;
  inputType?: string;
  mask?: string;
  maskType?: string;
  defaultValue?: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export function InputFormController({
  formControl,
  formControlName,
  label,
  error,
  register,
  placeholder,
  inputImg,
  inputType = "text",
  mask,
  maskType = "",
  defaultValue,
}: IFormInput) {
  const isFieldCorrect = !error;

  const configBlocks = {
    input: {
      mask: mask,
      unmask: true,
    },
  };

  const showInputStart = () => (
    <InputAdornment position="start">
      {inputImg && <img alt={label} src={inputImg} />}
    </InputAdornment>
  );

  const setClassMasPassword = inputType === "password" ? "mask-password" : "";

  const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props: any, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          blocks={configBlocks}
          mask="input"
          inputRef={ref}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    }
  );

  const showMaskCustom = (maskType: string) => {
    switch (maskType) {
      case MaskCustom.TextMaskCustom:
        return mask && TextMaskCustom;
      case MaskCustom.NumberMaskCustom:
        return NumberFormatCustom;
      default:
        return mask && TextMaskCustom;
    }
  };

  const maskCustom = showMaskCustom(maskType);

  return (
    <Controller
      name={formControlName}
      control={formControl}
      render={({ field: { onChange, onBlur, value, ref, name } }) => (
        <AlignColumn>
          <FormControlLabel
            className="width"
            label={label}
            name={name || ""}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value || defaultValue || ""}
            placeholder={placeholder || ""}
            labelPlacement="top"
            control={
              <TextField
                id={label}
                className={setClassMasPassword}
                type={inputType}
                {...register}
                error={!!error}
                onChange={onChange}
                onBlur={onBlur}
                value={value || defaultValue || ""}
                disableunderline="true"
                placeholder={placeholder || ""}
                helperText={error && error.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {(isFieldCorrect && value && (
                        <CheckCircleRoundedIcon />
                      )) ||
                        ""}
                    </InputAdornment>
                  ),
                  startAdornment: showInputStart(),
                  inputComponent: maskCustom,
                }}
              />
            }
          />
        </AlignColumn>
      )}
    />
  );
}
