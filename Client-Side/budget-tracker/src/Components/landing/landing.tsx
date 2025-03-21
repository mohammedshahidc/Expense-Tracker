"use client"
import React from 'react';
import HeroSection from './hero';
import FeaturesSection from './features';
import Header from './header';

const LandingPage = () => {
  return (
    <>
       <Header />
      <HeroSection />
      <FeaturesSection />
    </>
  );
};

export default LandingPage;