import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Rating,
  Alert,
  Paper,
  Divider,
  IconButton
} from '@mui/material';
import { LocationOn, Phone, CalendarToday, Schedule, Delete } from '@mui/icons-material';
import { bookingService } from '../../services/bookingService.js';
import SearchBox from '../../components/LandingSections/SearchBox';
import sideBannerImage from '../../assets/side_banner.png';
import dayjs from 'dayjs';
import FAQ from '../../components/LandingSections/FAQ';
import AppDownload from '../../components/LandingSections/AppDownload';
import Footer from '../../components/LandingSections/Footer';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const userBookings = bookingService.getBookings();
    setBookings(userBookings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const handleDeleteBooking = (bookingId) => {
    bookingService.deleteBooking(bookingId);
    loadBookings();
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MMMM D, YYYY');
  };

  const isUpcoming = (dateString) => {
    return dayjs(dateString).isAfter(dayjs(), 'day') || dayjs(dateString).isSame(dayjs(), 'day');
  };

  const upcomingBookings = bookings.filter(booking => isUpcoming(booking.date));
  const pastBookings = bookings.filter(booking => !isUpcoming(booking.date));

  return (
    <>
      {/* Thick Blue Section with Search Bar */}
      <Box sx={{ bgcolor: 'primary.main', pt: '6px', width: '100vw' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
            My Bookings
          </Typography>
          <SearchBox variant="page" />
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            {bookings.length === 0 ? (
              <Box textAlign="center" sx={{ mt: 8 }}>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                  No bookings found
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                  You haven't booked any appointments yet.
                </Typography>
                <Button variant="contained" href="/">
                  Find Medical Centers
                </Button>
              </Box>
            ) : (
              <Box>
                {/* Upcoming Bookings */}
                {upcomingBookings.length > 0 && (
                  <Box sx={{ mb: 6 }}>
                    <Typography
                      variant="h5"
                      sx={{ mb: 3, fontWeight: 600, color: 'success.main' }}
                    >
                      Upcoming Appointments ({upcomingBookings.length})
                    </Typography>
                    <Grid container spacing={3}>
                      {upcomingBookings.map((booking, index) => (
                        <Grid item xs={12} md={6} key={booking.id}>
                          <Card
                            elevation={3}
                            sx={{
                              height: '100%',
                              border: '2px solid',
                              borderColor: 'success.light',
                              position: 'relative',
                              maxWidth: 300
                            }}
                          >
                            <CardContent sx={{ p: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <h3 style={{
                                  margin: 0,
                                  fontSize: '1.2rem',
                                  fontWeight: 600,
                                  color: '#1976d2',
                                  lineHeight: 1.3,
                                  flex: 1
                                }}>
                                  {booking.hospitalName}
                                </h3>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteBooking(booking.id)}
                                  sx={{ color: 'error.main', ml: 1 }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Rating
                                  value={booking.rating}
                                  readOnly
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                  ({booking.rating}/5)
                                </Typography>
                              </Box>

                              <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 1, mt: 0.2 }} />
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                    {booking.hospitalAddress}, {booking.city}, {booking.state} {booking.zipCode}
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Phone sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                    {booking.phone}
                                  </Typography>
                                </Box>
                              </Box>

                              <Divider sx={{ my: 2 }} />

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <CalendarToday sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {formatDate(booking.date)}
                                </Typography>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Schedule sx={{ fontSize: 16, color: 'primary.main', mr: 1 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {booking.time}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Past Bookings */}
                {pastBookings.length > 0 && (
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ mb: 3, fontWeight: 600, color: 'text.secondary' }}
                    >
                      Past Appointments ({pastBookings.length})
                    </Typography>
                    <Grid container spacing={3}>
                      {pastBookings.map((booking) => (
                        <Grid item xs={12} md={6} lg={4} key={booking.id}>
                          <Card
                            elevation={1}
                            sx={{
                              height: '100%',
                              opacity: 0.7,
                              position: 'relative'
                            }}
                          >
                            <CardContent sx={{ p: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <h3 style={{
                                  margin: 0,
                                  fontSize: '1.2rem',
                                  fontWeight: 600,
                                  color: '#666',
                                  lineHeight: 1.3,
                                  flex: 1
                                }}>
                                  {booking.hospitalName}
                                </h3>
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteBooking(booking.id)}
                                  sx={{ color: 'error.main', ml: 1 }}
                                >
                                  <Delete fontSize="small" />
                                </IconButton>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Rating
                                  value={booking.rating}
                                  readOnly
                                  size="small"
                                  sx={{ mr: 1 }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                  ({booking.rating}/5)
                                </Typography>
                              </Box>

                              <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 1, mt: 0.2 }} />
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                    {booking.hospitalAddress}, {booking.city}, {booking.state} {booking.zipCode}
                                  </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Phone sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                    {booking.phone}
                                  </Typography>
                                </Box>
                              </Box>

                              <Divider sx={{ my: 2 }} />

                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <CalendarToday sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {formatDate(booking.date)}
                                </Typography>
                              </Box>

                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Schedule sx={{ fontSize: 16, color: 'text.secondary', mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {booking.time}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
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

export default MyBookings;
