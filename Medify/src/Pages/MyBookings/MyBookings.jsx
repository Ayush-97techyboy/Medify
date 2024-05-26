import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import MedHeader from "../../components/header/MedHeader";
import MedCardContainer from "../../components/card-container/MedCardContainer";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import leftBanner from "../../assets/left_banner.png";
import MedHospitalDetails from "../../components/hospital-details/MedHospitalDetails";
import useLocalStorage from "../../Hooks/LocalStorage";
import MedHospitalSearch from "../../components/search/MedHospitalSearch";

function MyBookings() {
  const [localData] = useLocalStorage("bookings");
  const [hospitals, setHospitals] = useState([]);

  const handleSearch = (searchText) => {
    const filteredData = localData.filter(
      (item) =>
        item.hospital["Hospital Name"]
          .toLowerCase()
          .trim()
          .indexOf(searchText.trim().toLowerCase()) !== -1
    );
    setHospitals(() => [...filteredData]);
  };

  useEffect(() => {
    if (Array.isArray(localData)) {
      setHospitals(() => [...localData]);
    }
  }, []);

  return (
    <Box component="section">
      <MedHeader title="My Bookings" />
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "-3rem",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <MedCardContainer sx={{ width: "70%" }}>
          <MedHospitalSearch
            sx={{
              padding: "1.5rem",
            }}
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
        <Grid2 container spacing={3}>
          <Grid2 md={8}>
            {hospitals.map((booking, index) => (
              <MedHospitalDetails
                key={`${booking.hospital["Provider ID"]}-${index}`}
                id={booking.hospital["Provider ID"]}
                title={booking.hospital["Hospital Name"]}
                state={booking.hospital.State}
                city={booking.hospital.City}
                zipCode={booking.hospital["ZIP Code"]}
                type={booking.hospital["Hospital Type"]}
                likes={
                  booking.hospital["Hospital overall rating"] !==
                  "Not Available"
                    ? booking.hospital["Hospital overall rating"]
                    : 0
                }
                hospitalData={booking.hospital}
                bookingData={booking.booking}
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

export default MyBookings;
