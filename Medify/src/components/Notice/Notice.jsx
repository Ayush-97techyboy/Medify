import { Box, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../theme/variables";

function MedNotice() {
  return (
    <Box
      component="div"
      sx={{
        backgroundColor: colors.primary,
        color: colors.white,
        fontSize: "0.75rem",
        textAlign: "center",
        paddingBlock: "0.8rem",
      }}
    >
      <Typography component="span" sx={{ fontSize: "0.8rem" }}>
        The health and well-being of our patients and their health care team
        will always be our priority, so we follow the best practices for
        cleanliness.
      </Typography>
    </Box>
  );
}

export default MedNotice;
