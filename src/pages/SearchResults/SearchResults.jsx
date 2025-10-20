import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Rating,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
import { LocationOn, Phone, Star } from '@mui/icons-material';
import hospitalIcon from '../../assets/Icons/hospi_ic.png';
import sideBannerImage from '../../assets/side_banner.png';
import { apiService } from '../../services/apiService.js';
import SearchBox from '../../components/LandingSections/SearchBox';
import FAQ from '../../components/LandingSections/FAQ';
import AppDownload from '../../components/LandingSections/AppDownload';
import Footer from '../../components/LandingSections/Footer';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const state = searchParams.get('state');
  const city = searchParams.get('city');

  useEffect(() => {
    if (state && city) {
      loadMedicalCenters();
    }
  }, [state, city]);

  const loadMedicalCenters = async () => {
    if (!state || !city) return;

    try {
      setLoading(true);
      setError('');
      const data = await apiService.getMedicalCenters(state, city);
      setMedicalCenters(data);
    } catch (err) {
      setError('Failed to load medical centers. The server may be starting up, please wait a moment and try again.');
      console.error('Error loading medical centers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (hospitalId) => {
    navigate(`/booking/${hospitalId}`, { 
      state: { 
        hospital: medicalCenters.find(center => center['Provider ID'] === hospitalId),
        searchState: state,
        searchCity: city
      } 
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading medical centers...
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This may take up to 60 seconds while the server starts up
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={loadMedicalCenters}>
            Retry
          </Button>
        }>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Thick Blue Section with Search Bar */}
      <Box sx={{ bgcolor: 'primary.main', pt: '6px', py: 0.5, width: '100vw' }}>
        <Container maxWidth="lg">
          <SearchBox variant="page" />
        </Container>
      </Box>

      {/* Information Section */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 2, mr: 5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* <Box sx={{ flex: 1 }} /> */}
          <Typography variant="h6" sx={{ textAlign: 'left', justifyContent: 'left', color: 'text.secondary', fontWeight: 700 }}>
            {medicalCenters.length} medical centers available in {state}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ textAlign: 'left', color: 'text.secondary', mt: 1 }}>
          Book appointments with minimum wait-time & verified doctor details
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            {medicalCenters.length === 0 ? (
              <Box textAlign="center" sx={{ mt: 8 }}>
                <Typography variant="h5" color="text.secondary">
                  No medical centers found in {city}, {state}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Try searching for a different city or state.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {medicalCenters.map((center) => (
                  <Card
                    key={center['Provider ID']}
                    elevation={3}
                    sx={{
                      width: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box
                              component="img"
                              src={hospitalIcon}
                              alt="Hospital Icon"
                              sx={{ width: 100, height: 100, mr: 1 }}
                            />
                            <Rating
                              value={center['Hospital overall rating']}
                              readOnly
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({center['Hospital overall rating']}/5)
                            </Typography>
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#1976d2', ml: 4 }}>
                            {center['Hospital Name']}
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Chip
                              label={center['Hospital Type']}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                            {center['Emergency Services'] === 'Yes' && (
                              <Chip
                                label="Emergency Services"
                                size="small"
                                color="error"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mr: 1, mt: 0.2 }} />
                            <Typography variant="body2" color="text.secondary">
                              {center['Address']}, {center['City']}, {center['State']} {center['ZIP Code']}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Phone sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {center['Phone Number']}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={() => handleBooking(center['Provider ID'])}
                            sx={{
                              py: 1.5,
                              fontWeight: 600,
                              boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
                              '&:hover': {
                                boxShadow: '0 6px 16px rgba(25,118,210,0.4)',
                              }
                            }}
                          >
                            Book FREE Center Visit
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
          <Box sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0, mt: { xs: 4, md: 0 } }}>
            <Box component="img" src={sideBannerImage} alt="Side Banner" sx={{ width: '100%', height: 'auto' }} />
          </Box>
        </Box>
      </Container>
      <FAQ />
      <AppDownload />
      <Footer />
    </>
  );
};

export default SearchResults;
