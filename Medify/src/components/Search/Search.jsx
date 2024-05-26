import { LocationOnOutlined, Search } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import MedAutocomplete from "../autocomplete/MedAutocomplete";
import MedButton from "../button/MedButton";
import { colors } from "../../theme/variables";
import { getCities } from "../../services/searchService";

function MedSearch({ states = [], state, city, getValue, sx }) {
  const [cities, setCities] = useState([]);
  const [selectedState, selectState] = useState(state ?? "");
  const [selectedCity, selectCity] = useState(city ?? "");

  const loadCities = async (state) => {
    if (state) {
      try {
        const resCities = await getCities(selectedState);
        setCities(() => [...resCities]);
      } catch (error) {
        console.log(error);
      }
    } else {
      selectCity("");
      setCities(() => []);
    }
  };

  const handleSearchClick = () => {
    if (getValue && typeof getValue === "function") {
      getValue({ state: selectedState, city: selectedCity });
    }
  };

  useEffect(() => {
    loadCities(selectedState);
  }, [selectedState]);

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
      <MedAutocomplete
        options={states}
        placeholder="State"
        startIcon={
          <LocationOnOutlined
            sx={{
              color: colors.bgGrey,
              fontSize: "1.8rem",
            }}
          />
        }
        onChange={(event, newValue) => selectState(newValue)}
        sx={{
          width: "30%",
        }}
        value={selectedState}
      />
      <MedAutocomplete
        options={cities}
        placeholder="City"
        startIcon={
          <LocationOnOutlined
            sx={{
              color: colors.bgGrey,
              fontSize: "1.8rem",
            }}
          />
        }
        onChange={(event, newCity) => selectCity(newCity)}
        sx={{
          width: "50%",
        }}
        value={selectedCity}
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

export default MedSearch;
