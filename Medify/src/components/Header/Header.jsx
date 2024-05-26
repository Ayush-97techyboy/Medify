import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { colors, fonts } from "../../theme/variables";

function MedHeader({ title }) {
  return (
    <Box
      component="section"
      sx={{
        background: colors.headerBg,
        borderRadius: "0 0 1rem 1rem",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: "5.5rem",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Typography
          component="span"
          sx={{
            fontWeight: 700,
            fontSize: "2.2rem",
            color: colors.white,
            fontFamily: fonts.ubuntu,
          }}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
}

export default MedHeader;
