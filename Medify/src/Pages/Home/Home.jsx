import React from "react";
import MedHeroSection from "../../components/HeroSection/HeroSection";
import { Box, Container } from "@mui/material";
import MedCardContainer from "../../components/CardContainer/CardContainer";
import MedSearchCard from "../../components/SearchCard/SearchCard";
import useGeneric from "../../Hooks/GenericHooks";

function Home() {
  const { states } = useGeneric();
  return (
    <Box component="section">
      <MedHeroSection />
      <Container
        component="section"
        maxWidth="lg"
        sx={{
          position: "relative",
          marginTop: "-6rem",
        }}
      >
        <MedCardContainer>
          <MedSearchCard states={states} />
        </MedCardContainer>
      </Container>
    </Box>
  );
}

export default Home;
