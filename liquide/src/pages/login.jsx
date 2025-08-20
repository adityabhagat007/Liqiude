import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  Alert,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { Phone, Lock } from '@mui/icons-material';
import { authAPI } from '../services/api';
import { ROUTES } from '../utils/config';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and basic phone characters
    const phoneRegex = new RegExp('^[\\d\\s\\-\\+\\(\\)]*$');
    if (phoneRegex.test(value) || value === '') {
      setPhoneNumber(value);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    const otpRegex = /^\d*$/;
    if (otpRegex.test(value) || value === '') {
      setOtp(value);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the real API to send OTP
      await authAPI.sendOTP(phoneNumber);
      setIsOtpSent(true);
      console.log('OTP sent to:', phoneNumber);
    } catch (error) {
      console.log(error);
      setError(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call the real API to verify OTP and get tokens
      const response = await authAPI.verifyOTP(phoneNumber, otp);
      console.log('Login successful:', response);
      
      // Redirect to dashboard after successful login
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      console.log(error);
      setError(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Call the real API to resend OTP
      await authAPI.sendOTP(phoneNumber);
      console.log('OTP resent to:', phoneNumber);
      setError('');
    } catch (error) {
      console.log(error);
      setError(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = ['Enter Phone Number', 'Enter OTP'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: '#1e3a8a',
                  mb: 1
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#64748b',
                  fontSize: '1.1rem'
                }}
              >
                Sign in to your Liquide account
              </Typography>
            </Box>

            {/* Stepper */}
            <Box sx={{ mb: 4 }}>
              <Stepper activeStep={isOtpSent ? 1 : 0} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Phone Number Form */}
            {!isOtpSent && (
              <Box component="form" onSubmit={handleSendOtp}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter your phone number"
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1e3a8a',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#1e3a8a',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Phone sx={{ color: '#64748b' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                      boxShadow: '0 6px 16px rgba(30, 58, 138, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      background: '#94a3b8',
                      transform: 'none',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </Button>
              </Box>
            )}

            {/* OTP Form */}
            {isOtpSent && (
              <Box component="form" onSubmit={handleVerifyOtp}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748b',
                    mb: 3,
                    textAlign: 'center'
                  }}
                >
                  We've sent a 6-digit OTP to {phoneNumber}
                </Typography>

                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter 6-digit OTP"
                  inputProps={{ maxLength: 6 }}
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: '#3b82f6',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1e3a8a',
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#1e3a8a',
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#64748b' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                      boxShadow: '0 6px 16px rgba(30, 58, 138, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      background: '#94a3b8',
                      transform: 'none',
                    },
                    transition: 'all 0.3s ease',
                    mb: 2
                  }}
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  sx={{
                    textTransform: 'none',
                    color: '#1e3a8a',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    },
                  }}
                >
                  Resend OTP
                </Button>

                <Button
                  fullWidth
                  variant="text"
                  onClick={() => {
                    setIsOtpSent(false);
                    setOtp('');
                    setError('');
                  }}
                  sx={{
                    textTransform: 'none',
                    color: '#64748b',
                    mt: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(100, 116, 139, 0.1)',
                    },
                  }}
                >
                  Change Phone Number
                </Button>
              </Box>
            )}

            {/* Additional Links */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  '& a': {
                    color: '#1e3a8a',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  },
                }}
              >
                Don't have an account?{' '}
                <a href="/register">Sign up</a>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
