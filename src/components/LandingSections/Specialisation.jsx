import React from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import DentistryImg from '/src/assets/Specialisation/Dentistry.png';
import PrimaryCareImg from '/src/assets/Specialisation/Primary Care.png';
import CardiologyImg from '/src/assets/Specialisation/Cardiology.png';
import MRIResonanceImg from '/src/assets/Specialisation/MRI Resonance.png';
import BloodTestImg from '/src/assets/Specialisation/Blood Test.png';
import PsychologistImg from '/src/assets/Specialisation/Psychologist.png';
import LaboratoryImg from '/src/assets/Specialisation/Laboratory.png';
import XRayImg from '/src/assets/Specialisation/X-Ray.png';

const specialisations = [
  { label: 'Dentistry', image: DentistryImg },
  { label: 'Primary Care', image: PrimaryCareImg },
  { label: 'Cardiology', image: CardiologyImg },
  { label: 'MRI Resonance', image: MRIResonanceImg },
  { label: 'Blood Test', image: BloodTestImg },
  { label: 'Psychologist', image: PsychologistImg },
  { label: 'Laboratory', image: LaboratoryImg },
  { label: 'X-Ray', image: XRayImg },
];

const Specialisation = () => {
  return (
    <Box sx={{ bgcolor: '#f0f6ff', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          Find By Specialisation
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {specialisations.map((spec) => (
            <Grid item xs={6} sm={3} md={3} key={spec.label}>
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
                <img src={spec.image} alt={spec.label} style={{ width: '50px', height: '50px' }} />
                <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
                  {spec.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant="contained" sx={{ bgcolor: '#007bff' }}>
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Specialisation;
