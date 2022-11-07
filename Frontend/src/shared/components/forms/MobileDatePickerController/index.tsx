import { FormControlLabel, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";

interface IFormInput {
  formControl: any;
  formControlName: string;
  label: string;
  register: any;
  error?: any;
}

export function MobileDatePickerController({
  formControl,
  formControlName,
  label,
  register,
  error,
}: IFormInput) {
  return (
    <Controller
      name={formControlName}
      control={formControl}
      render={({ field: { onChange, onBlur, ref, value, name } }) => (
        <FormControlLabel
          className="width"
          label={label}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value || ""}
          labelPlacement="top"
          control={
            <MobileDatePicker
              className="width"
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              {...register}
              inputFormat="DD/MM/YYYY"
              error={!!error}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error && error.message}
                />
              )}
            />
          }
        />
      )}
    />
  );
}
