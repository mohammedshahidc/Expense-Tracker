"use client"
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, useTheme, useMediaQuery } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Avatar sx={{ mr: 1, bgcolor: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            ExpenseTrack
          </Typography>
        </Box>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button color="inherit">Features</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">About</Button>
          </Box>
        )}

        <Button variant="outlined" color="primary" sx={{ ml: 2 }} href="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;