"use client"
import React from 'react';
import { Box, Container, Grid, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import NotificationsIcon from '@mui/icons-material/Notifications';

const FeatureContainer = styled(Box)(({ theme }) => ({
  background: '#ffffff',
  padding: theme.spacing(6, 0),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

const CircleAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#ebf4ff',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  width: theme.spacing(6),
  height: theme.spacing(6),
}));

const FeaturesSection = () => {
  return (
    <FeatureContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={6} sm={3}>
            <FeatureItem>
              <CircleAvatar>
                <AttachMoneyIcon />
              </CircleAvatar>
              <Typography variant="subtitle1" fontWeight="medium">Expense Tracking</Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FeatureItem>
              <CircleAvatar>
                <BarChartIcon />
              </CircleAvatar>
              <Typography variant="subtitle1" fontWeight="medium">Budget Planning</Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FeatureItem>
              <CircleAvatar>
                <PhoneIphoneIcon />
              </CircleAvatar>
              <Typography variant="subtitle1" fontWeight="medium">Mobile Access</Typography>
            </FeatureItem>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FeatureItem>
              <CircleAvatar>
                <NotificationsIcon />
              </CircleAvatar>
              <Typography variant="subtitle1" fontWeight="medium">Alert Notifications</Typography>
            </FeatureItem>
          </Grid>
        </Grid>
      </Container>
    </FeatureContainer>
  );
};

export default FeaturesSection;