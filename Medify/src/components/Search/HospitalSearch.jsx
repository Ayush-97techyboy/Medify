import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import MedButton from "../button/MedButton";
import { Search } from "@mui/icons-material";
import { colors } from "../../theme/variables";

function MedHospitalSearch({ getValue, sx }) {
  const [searchText, setSearchText] = useState("");

  const handleSearchClick = () => {
    if (getValue && typeof getValue === "function") {
      getValue(searchText);
    }
  };

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "2rem",
        flexDirection: "row",
        gap: "2%",
        ...sx,
      }}
    >
      <TextField
        placeholder="Search By Hospital"
        defaultValue={searchText}
        onChange={(e) => setSearchText(e.target.value)}
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
            width: "80%",
          },
          width: "80%",
        }}
        size="small"
      />
      <MedButton
        startIcon={
          <Search
            sx={{
              fontSize: "1.8rem !important",
            }}
          />
        }
        onClick={handleSearchClick}
      >
        Search
      </MedButton>
    </Box>
  );
}

export default MedHospitalSearch;
