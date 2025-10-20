import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  Paper,
  Alert,
  Snackbar
} from '@mui/material';

import { LocationOn, Phone, CheckCircle, KeyboardArrowRight } from '@mui/icons-material';
import dayjs from 'dayjs';
import hospitalIcon from '../../assets/Icons/hospi_ic.png';
import sideBannerImage from '../../assets/side_banner.png';
import { bookingService } from '../../services/bookingService.js';
import { apiService } from '../../services/apiService.js';
import SearchBox from '../../components/LandingSections/SearchBox';
import FAQ from '../../components/LandingSections/FAQ';
import AppDownload from '../../components/LandingSections/AppDownload';
import Footer from '../../components/LandingSections/Footer';

const Booking = () => {
  const { hospitalId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const hospital = location.state?.hospital;

  const [selectedDates, setSelectedDates] = useState({});
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [otherCenters, setOtherCenters] = useState([]);
  const [visibleDates, setVisibleDates] = useState(3); // Show first 3 dates initially

  // Generate time slots for the new interface
  const timeSlots = [
    { time: '11:30 AM', period: 'Morning', available: true },
    { time: '12:00 PM', period: 'Afternoon', available: true },
    { time: '12:30 PM', period: 'Afternoon', available: true },
    { time: '01:30 PM', period: 'Afternoon', available: true },
    { time: '02:00 PM', period: 'Afternoon', available: true },
    { time: '02:30 PM', period: 'Afternoon', available: true },
    { time: '06:00 PM', period: 'Evening', available: true },
    { time: '06:30 PM', period: 'Evening', available: true },
    { time: '07:00 PM', period: 'Evening', available: true },
    { time: '07:30 PM', period: 'Evening', available: true },
  ];

  const getPeriods = () => {
    const periods = ['Morning', 'Afternoon', 'Evening'];
    return periods.map(period => ({
      name: period,
      slots: timeSlots.filter(slot => slot.period === period)
    }));
  };

  // Generate dates for the new interface
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = dayjs().add(i, 'day');
      dates.push({
        date: date,
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : i === 2 ? 'Day after tomorrow' : date.format('MMM D'),
        fullLabel: date.format('MMMM D, YYYY')
      });
    }
    return dates;
  };

  const handleDateChange = (centerId, dateIndex) => {
    const selectedDate = getAvailableDates()[dateIndex];
    setSelectedDates(prev => ({ ...prev, [centerId]: selectedDate.date }));
    setSelectedTimeSlots(prev => ({ ...prev, [centerId]: '' }));
  };

  const handleShowMoreDates = () => {
    setVisibleDates(prev => Math.min(prev + 3, getAvailableDates().length));
  };

  const handleTimeSlotSelect = (centerId, time) => {
    setSelectedTimeSlots(prev => ({ ...prev, [centerId]: time }));
  };

  const handleBooking = (center) => {
    const selectedDate = selectedDates[center['Provider ID']];
    const selectedTimeSlot = selectedTimeSlots[center['Provider ID']];

    if (!selectedDate || !selectedTimeSlot || !center) return;

    const booking = {
      id: Date.now().toString(),
      hospitalName: center['Hospital Name'],
      hospitalAddress: center['Address'],
      city: center['City'],
      state: center['State'],
      zipCode: center['ZIP Code'],
      phone: center['Phone Number'],
      rating: center['Hospital overall rating'],
      date: selectedDate.format('YYYY-MM-DD'),
      time: selectedTimeSlot,
      bookedAt: new Date().toISOString()
    };

    bookingService.saveBooking(booking);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/my-bookings');
  };

  useEffect(() => {
    const fetchAllCenters = async () => {
      try {
        const allHospitals = await apiService.getHospitals(hospital?.['State'], hospital?.['City']);
        setOtherCenters(allHospitals);
        // Pre-select today for the selected hospital
        if (hospital) {
          setSelectedDates(prev => ({ ...prev, [hospital['Provider ID']]: dayjs() }));
        }
      } catch (error) {
        console.error('Error fetching centers:', error);
        setOtherCenters([]);
      }
    };
    if (hospital) {
      fetchAllCenters();
    }
  }, [hospital]);

  if (!hospital) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Hospital information not found. Please go back and select a medical center.
        </Alert>
      </Container>
    );
  }

  const minDate = dayjs();
  const maxDate = dayjs().add(7, 'day');

  return (
    <>
      {/* Thick Blue Section with Search Bar */}
      <Box sx={{ bgcolor: 'primary.main', pt: '6px', py: 0.5, width: '100vw' }}>
        <Container maxWidth="lg">
          <SearchBox variant="page" />
        </Container>
      </Box>

      {/* Information Section */}
      <Container maxWidth="lg" sx={{ mt: 10, mb: 2, mr: 4 }}>
        <Typography variant="h6" sx={{ textAlign: 'left', color: 'text.secondary', fontWeight: 700 }}>
          Book your appointment at {hospital['Hospital Name']}
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'left', color: 'text.secondary', mt: 1 }}>
          Book appointments with minimum wait-time & verified doctor details
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            {otherCenters.length === 0 ? (
              <Box textAlign="center" sx={{ mt: 8 }}>
                <Typography variant="h5" color="text.secondary">
                  No medical centers found in {hospital['City']}, {hospital['State']}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Try searching for a different city or state.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Selected Center (from search results) */}
            <Card
              elevation={3}
              sx={{
                width: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                border: '2px solid #1976d2',
                bgcolor: '#f8f9fa'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        component="img"
                        src={hospitalIcon}
                        alt="Hospital Icon"
                        sx={{ width: 80, height: 80, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                          {hospital['Hospital Name']} (Selected)
                        </Typography>
                        {selectedDates[hospital['Provider ID']] && selectedTimeSlots[hospital['Provider ID']] && (
                          <Box sx={{ bgcolor: '#e8f5e8', p: 0.5, borderRadius: 1, mb: 1 }}>
                            <Typography variant="caption" sx={{ color: '#2e7d32', fontWeight: 600, fontSize: '0.65rem' }}>
                              Appointment on {selectedDates[hospital['Provider ID']].format('MMMM D, YYYY')} at {selectedTimeSlots[hospital['Provider ID']]}
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={hospital['Hospital overall rating']} readOnly size="small" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            ({hospital['Hospital overall rating']}/5)
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Chip label={hospital['Hospital Type']} size="small" color="primary" variant="outlined" />
                          {hospital['Emergency Services'] === 'Yes' && (
                            <Chip label="Emergency Services" size="small" color="error" variant="outlined" />
                          )}
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <LocationOn sx={{ fontSize: 18, color: 'text.secondary', mr: 1, mt: 0.2 }} />
                      <Typography variant="body2" color="text.secondary">
                        {hospital['Address']}, {hospital['City']}, {hospital['State']} {hospital['ZIP Code']}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Phone sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {hospital['Phone Number']}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Select Date
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                      {getAvailableDates().slice(0, visibleDates).map((dateObj, index) => (
                        <Button
                          key={index}
                          variant={selectedDates[hospital['Provider ID']] && selectedDates[hospital['Provider ID']].isSame(dateObj.date, 'day') ? "contained" : "outlined"}
                          onClick={() => handleDateChange(hospital['Provider ID'], index)}
                          sx={{
                            minWidth: '120px',
                            py: 1.5,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            ...(selectedDates[hospital['Provider ID']] && selectedDates[hospital['Provider ID']].isSame(dateObj.date, 'day') && {
                              boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
                            })
                          }}
                        >
                          {dateObj.label}
                        </Button>
                      ))}
                      {visibleDates < getAvailableDates().length && (
                        <Button
                          onClick={handleShowMoreDates}
                          sx={{
                            minWidth: '50px',
                            py: 1.5,
                            fontWeight: 600,
                            fontSize: '0.9rem',
                          }}
                          variant="outlined"
                        >
                          <KeyboardArrowRight />
                        </Button>
                      )}
                    </Box>

                    {selectedDates[hospital['Provider ID']] && (
                      <>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                          Select Time Slot
                        </Typography>
                        {getPeriods().map((period) => (
                          <Box key={period.name} sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                              {period.name}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {period.slots.map((slot) => (
                                <Paper
                                  key={slot.time}
                                  elevation={selectedTimeSlots[hospital['Provider ID']] === slot.time ? 4 : 1}
                                  sx={{
                                    p: 1.5,
                                    minWidth: '100px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    border: selectedTimeSlots[hospital['Provider ID']] === slot.time ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                    bgcolor: selectedTimeSlots[hospital['Provider ID']] === slot.time ? '#f3f9ff' : 'white',
                                    '&:hover': {
                                      bgcolor: '#f5f5f5',
                                    }
                                  }}
                                  onClick={() => handleTimeSlotSelect(hospital['Provider ID'], slot.time)}
                                >
                                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {slot.time}
                                  </Typography>
                                </Paper>
                              ))}
                            </Box>
                          </Box>
                        ))}
                      </>
                    )}

                    {selectedDates[hospital['Provider ID']] && selectedTimeSlots[hospital['Provider ID']] && (
                      <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<CheckCircle />}
                          onClick={() => handleBooking(hospital)}
                          sx={{
                            py: 1.5,
                            px: 4,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            boxShadow: '0 6px 16px rgba(25,118,210,0.4)',
                            '&:hover': {
                              boxShadow: '0 8px 20px rgba(25,118,210,0.5)',
                            }
                          }}
                        >
                          Confirm Booking at {hospital['Hospital Name']}
                        </Button>
                      </Box>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Other Centers */}
            {otherCenters.filter(center => center['Provider ID'] !== hospital['Provider ID']).map((center) => (
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
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          component="img"
                          src={hospitalIcon}
                          alt="Hospital Icon"
                          sx={{ width: 80, height: 80, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                            {center['Hospital Name']}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating value={center['Hospital overall rating']} readOnly size="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              ({center['Hospital overall rating']}/5)
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Chip label={center['Hospital Type']} size="small" color="primary" variant="outlined" />
                            {center['Emergency Services'] === 'Yes' && (
                              <Chip label="Emergency Services" size="small" color="error" variant="outlined" />
                            )}
                          </Box>
                        </Box>
                      </Box>
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
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Select Date
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {getAvailableDates().slice(0, visibleDates).map((dateObj, index) => (
                          <Button
                            key={index}
                            variant={selectedDates[center['Provider ID']] && selectedDates[center['Provider ID']].isSame(dateObj.date, 'day') ? "contained" : "outlined"}
                            onClick={() => handleDateChange(center['Provider ID'], index)}
                            sx={{
                              minWidth: '120px',
                              py: 1.5,
                              fontWeight: 600,
                              fontSize: '0.9rem',
                              ...(selectedDates[center['Provider ID']] && selectedDates[center['Provider ID']].isSame(dateObj.date, 'day') && {
                                boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
                              })
                            }}
                          >
                            {dateObj.label}
                          </Button>
                        ))}
                        {visibleDates < getAvailableDates().length && (
                          <Button
                            onClick={handleShowMoreDates}
                            sx={{
                              minWidth: '50px',
                              py: 1.5,
                              fontWeight: 600,
                              fontSize: '0.9rem',
                            }}
                            variant="outlined"
                          >
                            <KeyboardArrowRight />
                          </Button>
                        )}
                      </Box>

                      {selectedDates[center['Provider ID']] && (
                        <>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                            Select Time Slot
                          </Typography>
                          {getPeriods().map((period) => (
                            <Box key={period.name} sx={{ mb: 3 }}>
                              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                                {period.name}
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {period.slots.map((slot) => (
                                  <Paper
                                    key={slot.time}
                                    elevation={selectedTimeSlots[center['Provider ID']] === slot.time ? 4 : 1}
                                    sx={{
                                      p: 1.5,
                                      minWidth: '100px',
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      border: selectedTimeSlots[center['Provider ID']] === slot.time ? '2px solid #1976d2' : '1px solid #e0e0e0',
                                      bgcolor: selectedTimeSlots[center['Provider ID']] === slot.time ? '#f3f9ff' : 'white',
                                      '&:hover': {
                                        bgcolor: '#f5f5f5',
                                      }
                                    }}
                                    onClick={() => handleTimeSlotSelect(center['Provider ID'], slot.time)}
                                  >
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                      {slot.time}
                                    </Typography>
                                  </Paper>
                                ))}
                              </Box>
                            </Box>
                          ))}
                        </>
                      )}

                      {selectedDates[center['Provider ID']] && selectedTimeSlots[center['Provider ID']] && (
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                          <Button
                            variant="contained"
                            size="large"
                            startIcon={<CheckCircle />}
                            onClick={() => handleBooking(center)}
                            sx={{
                              py: 1.5,
                              px: 4,
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              boxShadow: '0 6px 16px rgba(25,118,210,0.4)',
                              '&:hover': {
                                boxShadow: '0 8px 20px rgba(25,118,210,0.5)',
                              }
                            }}
                          >
                            Confirm Booking at {center['Hospital Name']}
                          </Button>
                        </Box>
                      )}
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

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSuccessClose} severity="success" variant="filled">
            Appointment booked successfully! Redirecting to My Bookings...
          </Alert>
        </Snackbar>
      </Container>
      <FAQ />
      <AppDownload />
      <Footer />
    </>
  );
};

export default Booking;

