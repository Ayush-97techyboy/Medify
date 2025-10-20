import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from './theme/theme';
import Layout from './components/Layout/Layout';
import Landing from './pages/Landing/Landing';
import SearchResults from './pages/SearchResults/SearchResults';
import Booking from './pages/Booking/Booking';
import MyBookings from './pages/MyBookings/MyBookings';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/booking/:hospitalId" element={<Booking />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Routes>
          </Layout>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
