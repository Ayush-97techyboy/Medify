import { Box } from "@mui/material";
import React from "react";
import MedSearch from "../search/MedSearch";
import { useNavigate } from "react-router-dom";

function MedSearchCard({ states }) {
  const navigate = useNavigate();
  const handleSearch = ({ state, city }) => {
    const path = `/hospitals?state=${state}&city=${city}`;
    navigate(path);
  };
  return (
    <Box component="section">
      <MedSearch states={states} getValue={handleSearch} />
    </Box>
  );
}

export default MedSearchCard;
