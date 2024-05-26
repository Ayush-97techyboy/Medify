import React, { useState } from "react";
import MedCardContainer from "../CardContainer/CardContainer";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Button, Typography } from "@mui/material";
import { colors } from "../../Themes/Variables";
import MedButton from "../Button/Button";
import { ThumbUp } from "@mui/icons-material";
import hospitalLogo from "../../Media/Hospital.png";
import MedBookingConfig from "../BookingConfig/BookingConfig";
import useLocalStorage from "../../Hooks/LocalStorage";
import moment from "moment";

function MedHospitalDetails({
  id,
  title,
  state,
  city,
  zipCode,
  type,
  likes,
  hospitalData,
  bookingData,
}) {
  const [bookConfig, toggleBookConfig] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const [localData, setLocalData] = useLocalStorage("bookings", []);
  const getSelectedDateTime = (selectedDateTime) => {
    setDateTime(() => ({ ...selectedDateTime }));
  };
  const handleBooking = () => {
    if (bookConfig) {
      if (dateTime?.date && dateTime.time) {
        setLocalData((prev) => [
          ...prev,
          { hospital: hospitalData, booking: dateTime },
        ]);
        toggleBookConfig(false);
      }
    } else {
      toggleBookConfig(true);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        "&:not(last-child)": {
          marginBottom: "1.5rem",
        },
      }}
    >
      <MedCardContainer
        elevate={false}
        sx={{
          padding: "1.5rem",
        }}
      >
        <Grid2 container spacing={2} mt={2}>
          <Grid2
            md={2.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: "translate(0, -2.5rem)",
            }}
          >
            <Box
              component="div"
              sx={{
                width: "7rem",
                height: "7rem",
              }}
            >
              <img
                src={hospitalLogo}
                alt="hospital"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Grid2>
          <Grid2 md={5.5}>
            <Typography
              component="p"
              fontWeight={600}
              fontSize="1.25rem"
              color={colors.skyBlue}
            >
              {title}
            </Typography>
            <Typography
              component="p"
              fontWeight={700}
              fontSize="0.875rem"
              color={colors.smokeDark}
              mt={1}
            >
              {city}, {state}, {zipCode}
            </Typography>
            <Typography
              component="p"
              fontSize="0.875rem"
              color={colors.smokeDark}
            >
              {type}
            </Typography>
            {!bookingData ? (
              <Typography
                component="p"
                fontSize="0.875rem"
                color={colors.smokeDark}
                mt={0.5}
                pb={1.5}
                borderBottom={!bookConfig ? "1px dashed" : "none"}
                borderColor={colors.borderGrey}
              >
                <Typography
                  component="span"
                  color={colors.textDeepGreen}
                  fontWeight={700}
                >
                  FREE
                </Typography>{" "}
                <Typography
                  component="span"
                  color={colors.textGrey}
                  sx={{
                    textDecoration: "line-through",
                  }}
                >
                  ₹500
                </Typography>{" "}
                Consultation fee at clinic
              </Typography>
            ) : (
              <Box mt={0.5} pb={1.5} visibility="hidden">
                ''
              </Box>
            )}
            <Box component="div" mt={2}>
              {!bookConfig ? (
                <MedButton
                  sx={{
                    backgroundColor: colors.green,
                    padding: 0,
                    minWidth: "40px",
                    borderRadius: "3.5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  size="small"
                >
                  <ThumbUp sx={{ marginRight: "0.2rem", fontSize: "1rem" }} />{" "}
                  {likes}
                </MedButton>
              ) : null}
            </Box>
          </Grid2>
          <Grid2
            md={4}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                flexDirection: "row",
                height: "1rem",
                gap: "4%",
                width: "100%",
              }}
            >
              {bookingData?.time ? (
                <Button variant="outlined" size="small" color="primary">
                  {bookingData.time}
                </Button>
              ) : null}
              {bookingData?.date ? (
                <Button variant="outlined" size="small" color="success">
                  {moment(bookingData.date).format("DD MMM yyyy")}
                </Button>
              ) : null}
            </Box>
            <Box component="div" width="100%">
              {!bookingData ? (
                <>
                  <Typography
                    component="p"
                    align="center"
                    color={colors.textGreen}
                    fontSize="0.875rem"
                    mb={1}
                  >
                    Available Today
                  </Typography>
                  <MedButton
                    sx={{
                      width: "100%",
                    }}
                    onClick={() => handleBooking()}
                  >
                    Book FREE Center Visit
                  </MedButton>
                </>
              ) : null}
            </Box>
          </Grid2>
        </Grid2>

        {bookConfig ? (
          <MedBookingConfig getValue={getSelectedDateTime} />
        ) : null}
      </MedCardContainer>
    </Box>
  );
}

export default MedHospitalDetails;
