import { FormControl, FormControlLabel, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";

interface IFormInput {
  formControl: any;
  formControlName: string;
  label: string;
  register: any;
  minDate?: Date;
  maxDate?: Date;
  error?: any;
}

export function MobileDatePickerController({
  formControl,
  formControlName,
  label,
  register,
  minDate,
  maxDate,
  error,
}: IFormInput) {
  return (
    <Controller
      name={formControlName}
      control={formControl}
      render={({ field: { onChange, onBlur, ref, value, name } }) => (
        <FormControl onChange={onChange} ref={ref} onBlur={onBlur} fullWidth>
          <FormControlLabel
            label={label}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value || ""}
            labelPlacement="top"
            control={
              <MobileDatePicker
                toolbarTitle="Selecione a data"
                fullWidth
                ref={ref}
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                {...register}
                inputFormat="DD/MM/YYYY"
                maxDate={maxDate}
                minDate={minDate}
                error={!!error}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    error={!!error}
                    helperText={error && error.message}
                  />
                )}
              />
            }
          />
        </FormControl>
      )}
    />
  );
}
