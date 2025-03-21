"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Grid,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { RegistrationFormValues, registrationValidationSchema } from '@/Schema/schema';
import { useFormik } from 'formik';
import { useAuth } from '@/hooks/useAuth';

const initialState: RegistrationFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false
}

const BrandSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
}));

const CircleDecoration = styled(Box)(({ size, top, left, right }) => ({
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
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  height: '100%',
}));

const RegistrationPage = () => {
  const { registerUser, error, loading } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const { values, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues: initialState,
    validationSchema: registrationValidationSchema,
    onSubmit: async (values) => {
      const user = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password
      };
      const message = await registerUser(user);
      if (message === "Registration Successful") {
        resetForm();
        if (!error) {
          router.push("/home");
        }

      }
    }
  });

  return (
    <Grid container sx={{ minHeight: '100vh', alignItems: 'stretch' }}>
      {!isMobile && (
        <Grid item md={5}>
          <BrandSection>
            <CircleDecoration size="100px" top="75%" left="20%" />
            <CircleDecoration size="140px" top="85%" right="20%" />
            <CircleDecoration size="60px" top="90%" left="40%" />

            <Avatar sx={{ width: 70, height: 70, mb: 2, bgcolor: 'white' }}>
              <Typography variant="h5" color="primary" fontWeight="bold">E</Typography>
            </Avatar>

            <Typography variant="h5" fontWeight="bold" mb={1}>
              ExpenseTrack
            </Typography>

            <Typography variant="body2" sx={{ mb: 4, opacity: 0.9, textAlign: 'center' }}>
              Simplify your financial management
            </Typography>

            <Paper
              elevation={0}
              sx={{
                bgcolor: 'rgba(255,255,255,0.1)',
                p: 2,
                borderRadius: 2,
                maxWidth: 280,
                mb: 2
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
                "This app has completely changed how I manage my expenses!"
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
                  <Typography variant="subtitle2" fontWeight="bold">Mohammed Shahid C</Typography>
                  <Typography variant="caption">Business Owner</Typography>
                </Box>
              </Box>
            </Paper>
          </BrandSection>
        </Grid>
      )}

      <Grid item xs={12} md={7}>
        <FormSection>
          <Box
            component="form"
            sx={{
              width: '100%',
              maxWidth: 380,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
            onSubmit={handleSubmit}
          >
            <Box sx={{ mb: 1, textAlign: 'center' }}>
              {isMobile && (
                <Avatar sx={{ width: 60, height: 60, mb: 2, mx: 'auto', bgcolor: 'primary.main' }}>
                  <Typography variant="h5" color="white" fontWeight="bold">E</Typography>
                </Avatar>
              )}

              <Typography variant="h6" component="h1" fontWeight="bold">
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                30-day free trial
              </Typography>
            </Box>

            <Grid container spacing={1.5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First name"
                  name="firstName"
                  variant="outlined"
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  variant="outlined"
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  required
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label="Email address"
              name="email"
              type="email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              required
            />
            <TextField
              fullWidth
              label="Create password"
              name="password"
              type="password"
              variant="outlined"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              required
            />
            <TextField
              fullWidth
              label="Confirm password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              value={values.confirmPassword}
              onChange={handleChange}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  color="primary"
                  checked={values.agreeToTerms}
                  onChange={handleChange}
                  required
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link href="#" underline="hover" color="primary">Terms</Link> &{' '}
                  <Link href="#" underline="hover" color="primary">Privacy Policy</Link>
                </Typography>
              }
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{ py: 1.2, mt: 1 }}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" display="inline" color="text.secondary">
                Already have an account?{' '}
              </Typography>
              <Link href="/login" variant="body2" underline="hover">
                Log in
              </Link>
            </Box>
          </Box>
        </FormSection>
      </Grid>
    </Grid>
  );
};

export default RegistrationPage;
