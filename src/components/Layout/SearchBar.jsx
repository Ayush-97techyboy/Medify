import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { apiService } from '../../services/apiService.js';

const SearchBar = ({ title, showTitle = true }) => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const statesData = await apiService.getStates();
        setStates(statesData);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const citiesData = await apiService.getCities(selectedState);
          setCities(citiesData);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  const handleSearch = () => {
    if (selectedState && selectedCity) {
      navigate(`/search-results?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          width: '100%',
          maxWidth: '800px',
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        {showTitle && (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            {title}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>State</InputLabel>
            <Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              label="State"
            >
              {states.map((stateOption) => (
                <MenuItem key={stateOption} value={stateOption}>
                  {stateOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120, flex: 1 }}>
            <InputLabel>City</InputLabel>
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              label="City"
            >
              {cities.map((cityOption) => (
                <MenuItem key={cityOption} value={cityOption}>
                  {cityOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={!selectedState || !selectedCity}
            sx={{
              px: 3,
              py: 1,
              fontWeight: 600,
              minWidth: '120px'
            }}
            startIcon={<Search />}
          >
            Search
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SearchBar;
