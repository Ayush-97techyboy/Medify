import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import OurMedicalSpecialistImg from '/src/assets/Our Medical Specialist.png';

const MedicalSpecialist = () => {
  return (
    <Box sx={{ bgcolor: '#f0f6ff', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          Our Medical Specialist
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={OurMedicalSpecialistImg}
            alt="Our Medical Specialist"
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default MedicalSpecialist;
