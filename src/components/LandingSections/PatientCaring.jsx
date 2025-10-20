import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PatientCaringImg from '../../assets/Patient Caring.png';

const PatientCaring = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          Patient Caring
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={PatientCaringImg}
            alt="Patient Caring"
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

export default PatientCaring;
