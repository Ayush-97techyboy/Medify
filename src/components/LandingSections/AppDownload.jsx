import React from 'react';
import { Box, Container } from '@mui/material';
import downloadAppImage from '../../assets/downlaod_app.png';

const AppDownload = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box component="img" src={downloadAppImage} alt="Download App" sx={{ width: '100%', height: 'auto', mb: -13 }} />
      </Container>
    </Box>
  );
};

export default AppDownload;
