import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Global Blue Banner */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 1, textAlign: 'center', width: '100vw' }}>
        <Typography variant="body2" sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
          The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
        </Typography>
      </Box>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ px: { xs: 0 } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '1.5rem'
              }}
            >
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Medify
              </Link>
            </Typography>
            <Navigation />
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
