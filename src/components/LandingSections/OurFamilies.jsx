import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import OurFamiliesImg from '../../assets/Our Families.png';

const OurFamilies = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          Our Families
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={OurFamiliesImg}
            alt="Our Families"
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

export default OurFamilies;
