import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MedHeader from "../../components/header/MedHeader";
import MedCardContainer from "../../components/card-container/MedCardContainer";
import MedSearch from "../../components/search/MedSearch";
import useGeneric from "../../hooks/genericHook";
import { useSearchParams } from "react-router-dom";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { colors } from "../../theme/variables";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import leftBanner from "../../assets/left_banner.png";
import { getHospitals } from "../../Services/SearchService";
import MedHospitalDetails from "../../components/hospital-details/MedHospitalDetails";

function Hospitals() {
  const { states } = useGeneric();
  const [searchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [state, setState] = useState(searchParams.get("state"));
  const [city, setCity] = useState(searchParams.get("city"));

  const loadHospitals = async (state, city) => {
    try {
      const resHospitals = await getHospitals(state, city);
      setHospitals(() => [...resHospitals]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = ({ state: selectedState, city: selectedCity }) => {
    setState(selectedState);
    setCity(selectedCity);
    loadHospitals(selectedState, selectedCity);
  };

  useEffect(() => {
    if (state && city) loadHospitals(state, city);
  }, []);

  return (
    <Box component="section">
      <MedHeader />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "-3rem",
        }}
      >
        <MedCardContainer>
          <MedSearch
            sx={{
              padding: "1.5rem",
            }}
            states={states}
            state={state}
            city={city}
            getValue={handleSearch}
          />
        </MedCardContainer>
      </Container>
      <Container
        maxWidth="lg"
        sx={{
          marginBlock: "5rem",
        }}
      >
        <Box
          component="div"
          sx={{
            paddingInline: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <Typography
            component="p"
            sx={{
              fontWeight: 500,
              fontSize: "1.5rem",
            }}
          >
            {hospitals.length} medical centers available in {city}
          </Typography>
          <Typography
            component="p"
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CheckCircleOutlineOutlined
              sx={{
                color: colors.textGrey,
                marginRight: "1.5rem",
              }}
            />
            <Typography
              component="span"
              sx={{
                color: colors.textGrey,
              }}
            >
              Book appointments with minimum wait-time & verified doctor details
            </Typography>
          </Typography>
        </Box>
        <Grid2 container spacing={3}>
          <Grid2 md={8}>
            {hospitals.map((hospital) => (
              <MedHospitalDetails
                key={hospital["Provider ID"]}
                id={hospital["Provider ID"]}
                title={hospital["Hospital Name"]}
                state={hospital.State}
                city={hospital.City}
                zipCode={hospital["ZIP Code"]}
                type={hospital["Hospital Type"]}
                likes={
                  hospital["Hospital overall rating"] !== "Not Available"
                    ? hospital["Hospital overall rating"]
                    : 0
                }
                hospitalData={hospital}
              />
            ))}
          </Grid2>
          <Grid2 md={4}>
            <Box
              component="div"
              sx={{
                height: "15rem",
              }}
            >
              <MedCardContainer
                elevate={false}
                sx={{
                  backgroundColor: "transparent",
                  background: `url(${leftBanner}) no-repeat 1.5% center`,
                  backgroundSize: "225%",
                }}
              ></MedCardContainer>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

export default Hospitals;
