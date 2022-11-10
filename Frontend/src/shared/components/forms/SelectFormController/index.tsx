import { FormControlLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { Controller } from "react-hook-form";
import { theme } from "styles/theme";

interface IFormInput {
  formControl: any;
  formControlName: string;
  label: string;
  register: any;
  error?: any;
  defaultValues: any;
  enumType?: boolean;
}

export function SelectFormController({
  formControl,
  formControlName,
  label,
  register,
  error,
  defaultValues,
  enumType = false,
}: IFormInput) {
  const getDefaultValuesOfSelectionByProps = () => {
    return enumType
      ? Object.keys(defaultValues).map((key, index) => (
          <MenuItem className="select" key={index} value={defaultValues[key]}>
            <div className="select">{key}</div>
          </MenuItem>
        ))
      : defaultValues.map((value: any) => (
          <MenuItem className="select" key={value} value={value}>
            <div className="select">{value}</div>
          </MenuItem>
        ));
  };

  return (
    <Controller
      name={formControlName}
      control={formControl}
      render={({ field: { onChange, onBlur, ref, value, name } }) => (
        <FormControlLabel
          sx={{ width: "100%" }}
          label={label}
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          labelPlacement="top"
          control={
            <Select
              sx={{ width: "100%" }}
              inputProps={{
                MenuProps: {
                  MenuListProps: {
                    sx: {
                      backgroundColor: `${theme.primary50}`,
                    },
                  },
                },
              }}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ""}
              {...register}
              error={!!error}
            >
              {getDefaultValuesOfSelectionByProps()}
            </Select>
          }
        />
      )}
    />
  );
}
