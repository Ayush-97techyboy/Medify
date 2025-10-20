import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';

const SearchBox = ({ variant = 'landing' }) => {
  const navigate = useNavigate();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const statesData = await apiService.getStates();
        console.log('Fetched states:', statesData); // Debug log
        if (Array.isArray(statesData)) {
          setStates(statesData);
        } else {
          console.error('States data is not an array:', statesData);
          setStates([]);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity('');
      return;
    }
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const citiesData = await apiService.getCities(selectedState);
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, [selectedState]);

  const handleSearch = () => {
    if (selectedState && selectedCity) {
      navigate(`/search-results?state=${selectedState}&city=${selectedCity}`);
    }
  };

  const boxSx = variant === 'landing'
    ? { bgcolor: 'white', py: 4, boxShadow: 3, borderRadius: 2, mt: -8, mx: 'auto', maxWidth: 900, position: 'relative', zIndex: 10 }
    : { bgcolor: 'white', py: 2, boxShadow: 3, borderRadius: 2, mt: 2, mx: 'auto', maxWidth: 900, position: 'relative', zIndex: 10 };

  return (
    <Box sx={boxSx}>
      <Container>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                value={selectedState}
                label="State"
                onChange={(e) => setSelectedState(e.target.value)}
                disabled={loadingStates}
                sx={{ minWidth: 150, fontSize: '1rem' }}
              >
                {loadingStates ? (
                  <MenuItem value="">
                    <em>Loading...</em>
                  </MenuItem>
                ) : (
                  states.map((state) => (
                    <MenuItem key={state} value={state} sx={{ fontSize: '1rem' }}>
                      {state}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="city-label">City</InputLabel>
              <Select
                labelId="city-label"
                value={selectedCity}
                label="City"
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState || loadingCities}
                sx={{ minWidth: 150, fontSize: '1rem' }}
              >
                {loadingCities ? (
                  <MenuItem value="">
                    <em>Loading...</em>
                  </MenuItem>
                ) : (
                  cities.map((city) => (
                    <MenuItem key={city} value={city} sx={{ fontSize: '1rem' }}>
                      {city}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<Search />}
              onClick={handleSearch}
              disabled={!selectedState || !selectedCity}
              sx={{ fontSize: '1rem', padding: '10px 12px', minWidth: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchBox;
