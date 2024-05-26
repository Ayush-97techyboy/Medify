import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { colors } from "../../theme/variables";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { bookingSlots } from "../../utils/constants";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { getFormattedFutureDates } from "../../services/genericService";

function MedBookingConfig({ getValue }) {
  const [selectedDate, selectDate] = useState(new Date());
  const [selectedTime, selectTime] = useState("");

  useEffect(() => {
    if (getValue && typeof getValue === "function")
      getValue({ date: selectedDate, time: selectedTime });
  }, [selectedDate, selectedTime]);
  return (
    <Box
      component="div"
      sx={{
        borderTop: `1px dashed ${colors.borderGrey}`,
        marginTop: "2rem",
        position: "relative",
        "&::before": {
          content: "''",
          width: "7%",
          height: ".35rem",
          backgroundColor: colors.green,
          position: "absolute",
          borderRadius: "4px",
          left: "47%",
        },
      }}
    >
      <Box
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          marginTop: "1rem",
        }}
      >
        <Box component="div" sx={{ width: "82%" }}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            slidesPerView={3}
          >
            {getFormattedFutureDates(7).map((frmDate) => (
              <SwiperSlide key={frmDate.label}>
                <Box
                  component="div"
                  className={
                    selectedDate.getDate() === frmDate.date.getDate()
                      ? "active"
                      : ""
                  }
                  px={3}
                  py={1}
                  sx={{
                    borderBottom: "4px solid",
                    borderColor: colors.borderTab,
                    cursor: "pointer",
                    "&.active": {
                      borderColor: colors.primary,
                    },
                  }}
                  onClick={() => selectDate(() => frmDate.date)}
                >
                  <Typography component="p" textAlign="center" fontWeight={600}>
                    {frmDate.label}
                  </Typography>
                  <Typography
                    component="p"
                    textAlign="center"
                    color={colors.textGreen}
                    fontSize="0.875rem"
                  >
                    11 slots available
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box
          component="div"
          className="swiper-button-prev"
          sx={{
            width: "3rem !important",
            height: "3rem !important",
            borderRadius: "50%",
            border: "1px solid",
            borderColor: colors.iconBorder,
            "&::after": {
              fontSize: "0.8rem !important",
              fontWeight: "bold",
              color: colors.blue,
            },
          }}
        />
        <Box
          component="div"
          className="swiper-button-next"
          sx={{
            width: "3rem !important",
            height: "3rem !important",
            borderRadius: "50%",
            border: "1px solid",
            borderColor: colors.iconBorder,
            "&::after": {
              fontSize: "0.8rem !important",
              fontWeight: "bold",
              color: colors.blue,
            },
          }}
        />
      </Box>
      <TableContainer
        component="section"
        sx={{
          marginTop: "0.5rem",
        }}
      >
        <Table>
          <TableBody>
            {bookingSlots.map((item, index) => (
              <TableRow
                key={`bkSlot-${index}`}
                sx={{
                  "&:last-child": {
                    ".MuiTableCell-root": {
                      border: "none",
                    },
                  },
                }}
              >
                <TableCell>
                  <Typography
                    component="span"
                    fontSize="0.875rem"
                    color={colors.smokeDark}
                    width="20%"
                  >
                    {item.label}
                  </Typography>
                </TableCell>
                {item.slots.map((slot, i) => (
                  <TableCell key={`slot-${i}`}>
                    {slot !== "" ? (
                      <Button
                        size="small"
                        key={`slt-${i}`}
                        variant={
                          selectedTime === slot ? "contained" : "outlined"
                        }
                        sx={{
                          color: selectedTime === slot ? colors.white : null,
                        }}
                        onClick={() => selectTime(slot)}
                      >
                        {slot}
                      </Button>
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MedBookingConfig;
