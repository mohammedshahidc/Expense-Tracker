"use client"
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Link, 
  Divider, 
  Paper,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

const BrandSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
}));

const CircleDecoration = styled(Box)(({ theme, size, top, left, right }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  top: top,
  left: left,
  right: right,
}));

const FormSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  height: '100%',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  justifyContent: 'center',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  
  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* Brand Section - hidden on mobile */}
      {!isMobile && (
        <Grid item xs={false} sm={false} md={6}>
          <BrandSection>
            <CircleDecoration size="120px" top="75%" left="20%" />
            <CircleDecoration size="160px" top="85%" right="20%" />
            <CircleDecoration size="80px" top="90%" left="40%" />
            
            <Avatar sx={{ width: 80, height: 80, mb: 3, bgcolor: 'white' }}>
              <Typography variant="h4" color="primary" fontWeight="bold">E</Typography>
            </Avatar>
            
            <Typography variant="h4" fontWeight="bold" mb={1}>
              ExpenseTrack
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 6, opacity: 0.9 }}>
              Simplify your financial management
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.1)', 
                p: 3, 
                borderRadius: 2, 
                maxWidth: 300,
                mb: 3
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  fontStyle: 'italic', 
                  color: 'white', 
                  textAlign: 'center', 
                  mb: 2 
                }}
              >
                "This app has completely changed how I manage my expenses. I save 5 hours every month!"
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 30, 
                    height: 30, 
                    bgcolor: 'rgba(255,255,255,0.3)', 
                    mr: 1 
                  }} 
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">Sarah J.</Typography>
                  <Typography variant="caption">Small Business Owner</Typography>
                </Box>
              </Box>
            </Paper>
          </BrandSection>
        </Grid>
      )}
      
      {/* Form Section */}
      <Grid item xs={12} sm={12} md={6}>
        <FormSection>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: 400,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              {isMobile && (
                <Avatar sx={{ width: 60, height: 60, mb: 2, mx: 'auto', bgcolor: 'primary.main' }}>
                  <Typography variant="h5" color="white" fontWeight="bold">E</Typography>
                </Avatar>
              )}
              
              <Typography variant="h5" component="h1" fontWeight="bold">
                Log in to your account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your email and password to continue
              </Typography>
            </Box>

            <TextField
              fullWidth
              label="Email address"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)} 
                    color="primary"
                    size="small"
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link href="#" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Box>

            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth 
              size="large"
              sx={{ py: 1.5 }}
            >
              Log In
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                or
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <SocialButton 
                variant="outlined" 
                fullWidth 
                startIcon={<GoogleIcon />}
              >
                Google
              </SocialButton>
              <SocialButton 
                variant="outlined" 
                fullWidth 
                startIcon={<AppleIcon />}
              >
                Apple
              </SocialButton>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" display="inline" color="text.secondary">
                Don't have an account?{' '}
              </Typography>
              <Link href="/register" variant="body2" underline="hover">
                Sign up
              </Link>
            </Box>
          </Box>
        </FormSection>
      </Grid>
    </Box>
  );
};

export default LoginPage;