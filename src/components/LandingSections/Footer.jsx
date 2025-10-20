import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import footerLogo from '../../assets/Logo.png';

const footerLinks = [
  {
    title: 'About',
    links: ['About Us', 'Our Team', 'Careers', 'Contact Us'],
  },
  {
    title: 'Services',
    links: ['Doctors', 'Hospitals', 'Labs', 'Pharmacy'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQs'],
  },
  {
    title: 'Social',
    links: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn'],
  },
];

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#0d47a1', color: 'white', py: 6 }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        <Grid container spacing={{ xs: 15, md: 20 }}>
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: 2 }}>
              <Box
                component="img"
                src={footerLogo}
                alt="Footer Logo"
                sx={{ width: '150px', height: 'auto', cursor: 'pointer' }}
                onClick={() => window.location.href = '/'}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" href="#" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="#" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="#" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="#" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
          {footerLinks.map((section) => (
            <Grid item xs={6} sm={6} md={3} key={section.title}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {section.title}
              </Typography>
              {section.links.map((link) => (
                <Link
                  href="#"
                  key={link}
                  underline="hover"
                  color="inherit"
                  display="block"
                  sx={{ mb: 1 }}
                >
                  {link}
                </Link>
              ))}
            </Grid>
          ))}
        </Grid>
        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
          &copy; {new Date().getFullYear()} Medify. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
