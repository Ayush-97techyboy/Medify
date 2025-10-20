import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import heroImage from '../../assets/hero_image.png';

const Hero = () => {
  return (
    <Box
      sx={{
        height: { xs: 'auto', md: '600px' },
        py: { xs: 4, md: 0 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#333' }}>
              Skip the travel! Find Online <br />
              <span style={{ color: '#007bff' }}>Medical Centers</span>
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
              Connect instantly with a 24x7 specialist or choose to <br />
              video visit a particular doctor.
            </Typography>
            <Button variant="contained" size="large" sx={{ bgcolor: '#007bff' }}>
              Find Doctors
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={heroImage}
              alt="Hero"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
