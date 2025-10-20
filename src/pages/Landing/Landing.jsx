import React from 'react';
import Hero from '../../components/LandingSections/Hero';
import SearchBox from '../../components/LandingSections/SearchBox';
import SearchCategories from '../../components/LandingSections/SearchCategories';
import PromoBanners from '../../components/LandingSections/PromoBanners';
import Specialisation from '../../components/LandingSections/Specialisation';
import MedicalSpecialist from '../../components/LandingSections/MedicalSpecialist';
import PatientCaring from '../../components/LandingSections/PatientCaring';
import LatestNews from '../../components/LandingSections/LatestNews';
import OurFamilies from '../../components/LandingSections/OurFamilies';
import FAQ from '../../components/LandingSections/FAQ';
import AppDownload from '../../components/LandingSections/AppDownload';
import Footer from '../../components/LandingSections/Footer.jsx';

const Landing = () => {
  return (
    <>
      <Hero />
      <SearchBox />
      <SearchCategories />
      <PromoBanners />
      <Specialisation />
      <MedicalSpecialist />
      <PatientCaring />
      <LatestNews />
      <OurFamilies />
      <FAQ />
      <AppDownload />
      <Footer />
    </>
  );
};

export default Landing;
