"use client"
import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardCard from './dashBoardPreview';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: '#f0f5ff',
  padding: theme.spacing(6, 0), // Reduced padding
}));

const HeroSection = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Track Your Expenses With Ease
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              A simple yet powerful tool to help you manage your
              personal and business expenses. Stay on top of your
              finances with insightful reports and budget tracking.
            </Typography>
            <Button variant="contained" color="primary" size="medium" href="/register" sx={{ px: 3, py: 1, borderRadius: 1 }}>
              Get Started Free
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardCard />
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection;
