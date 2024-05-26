import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { colors } from "../../theme/variables";
import MedButton from "../button/MedButton";
import heroImage from "../../assets/hero_image.png";

function MedHeroSection() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box component="div">
        <Typography
          component="p"
          sx={{
            fontSize: "1.875rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: colors.dark,
            paddingTop: "3rem",
            lineHeight: 1,
          }}
        >
          Skip the travel! Find Online <br />
          <Typography
            component="span"
            sx={{
              fontWeight: 700,
              fontSize: "3.5rem",
            }}
          >
            Medical{" "}
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: "3.5rem",
                color: colors.primary,
              }}
            >
              Centers
            </Typography>
          </Typography>
        </Typography>
        <Typography
          component="p"
          sx={{
            fontWeight: 400,
            fontSize: "1.25rem",
            letterSpacing: "0.02em",
            color: colors.lightGrey,
            marginTop: "0.5rem",
            marginBottom: "1.7rem",
          }}
        >
          Connect instantly with a 24x7 specialist or choose to video visit a
          particular doctor.
        </Typography>
        <MedButton size="large">Find Centers</MedButton>
      </Box>
      <Box
        component="div"
        sx={{
          width: "70%",
          height: "28.5rem",
          background: `url(${heroImage}) no-repeat right bottom`,
          filter: "drop-shadow(0 15px 20px #00000059)",
          backgroundSize: "100%",
        }}
      ></Box>
    </Container>
  );
}

export default MedHeroSection;
