import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { colors } from "../../theme/variables";

function MedAutocomplete({
  value,
  onChange,
  options,
  placeholder,
  startIcon,
  sx,
  ...attributes
}) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{
        width: "100%",
        backgroundColor: colors.inputBgLight,
        ...sx,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            startAdornment: startIcon,
          }}
          sx={{
            color: colors.bgGrey,
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: `1px solid ${colors.borderLight}`,
              },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${colors.borderLight}`,
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${colors.borderLight}`,
              borderRadius: "0.5rem",
            },
          }}
          size="small"
        />
      )}
      forcePopupIcon={false}
      value={value}
      onChange={onChange}
      {...attributes}
    />
  );
}

export default MedAutocomplete;
