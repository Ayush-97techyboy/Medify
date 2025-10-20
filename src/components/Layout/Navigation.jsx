import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Button, 
  useTheme, 
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const navigationItems = [
    { label: 'Find Doctors', path: '/' },
    { label: 'Hospitals', path: '/' },
    { label: 'Medicines'},
    { label: 'Surgeries'},
    { label: 'Software for Provider'},
    { label: 'Facilities'},
    { label: 'My Bookings', path: '/my-bookings' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  if (isMobile) {
    return (
      <>
        <IconButton
          edge="end"
          color="primary"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {navigationItems.map((item) => (
            <MenuItem
              key={item.label}
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.label}
          color="primary"
          onClick={() => navigate(item.path)}
          sx={{
            color: location.pathname === item.path ? 'primary.main' : 'text.primary',
            fontWeight: location.pathname === item.path ? 600 : 400,
            '&:hover': {
              bgcolor: 'primary.light',
              color: 'white',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
};

export default Navigation;