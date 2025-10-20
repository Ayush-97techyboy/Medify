import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import doctorsIcon from '../../assets/Icons/Doctor.png';
import labsIcon from '../../assets/Icons/Lab.png';
import hospitalsIcon from '../../assets/Icons/Hospital.png';
import medicalStoreIcon from '../../assets/Icons/Medical Store.png';
import ambulanceIcon from '../../assets/Icons/Ambulance.png';

const categories = [
  { label: 'Doctors', icon: doctorsIcon },
  { label: 'Labs', icon: labsIcon },
  { label: 'Hospitals', icon: hospitalsIcon },
  { label: 'Medical Store', icon: medicalStoreIcon },
  { label: 'Ambulance', icon: ambulanceIcon },
];

const SearchCategories = () => {
  return (
    <Box sx={{ bgcolor: '#f0f6ff', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 4, fontWeight: 600 }}>
          You may be looking for
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {categories.map((category) => (
            <Grid item xs={6} sm={4} md={2.4} key={category.label}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: '#e6f0ff',
                  },
                }}
              >
                <Box
                  component="img"
                  src={category.icon}
                  alt={category.label}
                  sx={{ width: 64, height: 64 }}
                />
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                  {category.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchCategories;
