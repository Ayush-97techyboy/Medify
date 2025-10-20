import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import LatestNewsImg from '../../assets/Latest News.png';

const LatestNews = () => {
  return (
    <Box sx={{ py: 6, bgcolor: '#f0f6ff' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}>
          Read Our Latest News
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={LatestNewsImg}
            alt="Latest News"
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

export default LatestNews;
