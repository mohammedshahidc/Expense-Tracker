import React from 'react';
import { Card, Box, Typography, Grid, Avatar } from '@mui/material';

const DashboardCard = () => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', maxWidth: 500, mx: 'auto' }}>
      <Box sx={{ bgcolor: 'primary.light', p: 2, height: 60 }}>
        <Box sx={{ width: '60%', bgcolor: 'primary.main', height: '100%', borderRadius: 1, display: 'flex', alignItems: 'center', pl: 2 }}>
          <Typography color="white" fontWeight="bold">Dashboard</Typography>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ bgcolor: '#f0f5ff', p: 2 }}>
              <Typography variant="caption" color="text.secondary">Total Expenses</Typography>
              <Typography variant="h6" fontWeight="bold">$1,248</Typography>
              <Box sx={{ bgcolor: 'primary.light', width: '90%', height: 20, borderRadius: 5, mt: 1 }} />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card variant="outlined" sx={{ bgcolor: '#f0f5ff', p: 2 }}>
              <Typography variant="caption" color="text.secondary">Budget Status</Typography>
              <Typography variant="h6" fontWeight="bold">68%</Typography>
              <Box sx={{ mt: 1, position: 'relative', height: 10 }}>
                <Box sx={{ bgcolor: '#e2e8f0', width: '100%', height: '100%', borderRadius: 5, position: 'absolute' }} />
                <Box sx={{ bgcolor: 'primary.main', width: '68%', height: '100%', borderRadius: 5, position: 'absolute' }} />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ bgcolor: '#f0f5ff', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ mr: 2, bgcolor: '#fed7d7', width: 30, height: 30 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ width: 90, height: 4, bgcolor: '#718096', mb: 2 }} />
                  <Box sx={{ width: 70, height: 4, bgcolor: '#718096' }} />
                </Box>
              </Box>
              <Typography sx={{ color: '#f7685b', fontWeight: 'bold' }}>-$42</Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default DashboardCard;