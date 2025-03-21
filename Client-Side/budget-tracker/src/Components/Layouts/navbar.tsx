import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => (
  <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" color="primary">
        Expense<span style={{ fontWeight: 'bold' }}>Track</span>
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button>Features</Button>
        <Button>Pricing</Button>
        <Button>About</Button>
        <Button variant="outlined">Login</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;