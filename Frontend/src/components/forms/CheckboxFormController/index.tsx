import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface IFormInput {
  formControl: any;
  formControlName: string;
  label: string;
  error?: any;
}

export function CheckboxFormController({
  formControl,
  formControlName,
  label,
  error,
}: IFormInput) {
  return (
    <Controller
      name={formControlName}
      control={formControl}
      render={({ field: { onChange, value = false, ref, name, onBlur } }) => (
        <FormControl>
          <FormControlLabel
            label={label}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            labelPlacement="top"
            control={
              <Checkbox
                name={name}
                ref={ref}
                size="medium"
                onChange={onChange}
                onBlur={onBlur}
                checked={value}
                value={value}
              />
            }
          />
          <FormHelperText>{error && error.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
