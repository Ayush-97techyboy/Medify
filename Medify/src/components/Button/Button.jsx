import { Button } from "@mui/material";
import React from "react";
import { colors } from "../../theme/variables";

function MedButton({ onClick, startIcon, size, sx, children, ...attributes }) {
  return (
    <Button
      startIcon={startIcon}
      color="primary"
      variant="contained"
      onClick={onClick}
      size={size}
      sx={{
        fontWeight: 400,
        color: colors.white,
        borderRadius: "0.5rem",
        ...sx,
      }}
      {...attributes}
    >
      {children}
    </Button>
  );
}

export default MedButton;
