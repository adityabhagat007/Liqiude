import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ROUTES } from '../utils/config';
import { protectedAPI } from '../services/api';
import Notification from '../components/Notification/Notification';

const MandatePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [automaticPayment, setAutomaticPayment] = useState(false);
  const [rebalancingFrequency, setRebalancingFrequency] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success'
  });

  // Extract basketId from location state or URL params
  const basketId = location.state?.basketId || 'default';

  const handleAutomaticPaymentChange = (event) => {
    setAutomaticPayment(event.target.checked);
  };

  const handleRebalancingFrequencyChange = (event) => {
    setRebalancingFrequency(event.target.value);
  };

  const handleSave = async () => {
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const response = await protectedAPI.submitMandate({
        basketId,
        rebalancingFrequency
      });

      console.log('Mandate submission response:', response);

      if (response?.status === 'success') {
        setSuccess('Mandate settings saved successfully!');
        setNotification({
          open: true,
          message: 'Your mandate has been successfully configured. You will receive updates on your investment schedule.',
          type: 'success'
        });
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate(ROUTES.DASHBOARD, { replace: true });
        }, 2000);
      } else {
        throw new Error('Failed to save mandate settings');
      }
    } catch (err) {
      console.error('Mandate submission error:', err);
      setError(err.message || 'Failed to save mandate settings. Please try again.');
      setNotification({
        open: true,
        message: err.message || 'Failed to save mandate settings. Please try again.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to initial state or navigate back
    setAutomaticPayment(false);
    setRebalancingFrequency('monthly');
    setSuccess('');
    setError('');
    navigate(-1);
  };

  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2, color: '#1e3a8a' }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 2 }}>
            Manage Mandate
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Configure your payment and rebalancing preferences
          </Typography>
        </Box>

        {/* Alerts */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              {/* Automatic Payment Toggle */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={automaticPayment}
                      onChange={handleAutomaticPaymentChange}
                      name="automaticPayment"
                      color="primary"
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#1e3a8a',
                          '&:hover': {
                            backgroundColor: 'rgba(30, 58, 138, 0.08)',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#1e3a8a',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                      Automatic Payment
                    </Typography>
                  }
                  labelPlacement="start"
                  sx={{
                    width: '100%',
                    justifyContent: 'space-between',
                    m: 0,
                    mb: 2
                  }}
                />
                <Typography variant="body2" sx={{ color: '#64748b', ml: 4 }}>
                  Enable automatic payments for hassle-free investments. Your linked account will be debited automatically.
                </Typography>
              </Grid>

              {/* Rebalancing Frequency Dropdown */}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <FormControl fullWidth variant="outlined" sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}>
                  <InputLabel id="rebalancing-frequency-label">Rebalancing Frequency</InputLabel>
                  <Select
                    labelId="rebalancing-frequency-label"
                    id="rebalancing-frequency-select"
                    value={rebalancingFrequency}
                    onChange={handleRebalancingFrequencyChange}
                    label="Rebalancing Frequency"
                    sx={{ color: '#1e3a8a', fontWeight: 600 }}
                  >
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="quarterly">Quarterly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2" sx={{ color: '#64748b', mt: 1 }}>
                  Choose how often your portfolio should be rebalanced to maintain target asset allocation.
                </Typography>
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12} sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleCancel}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderRadius: 2,
                      borderColor: '#ef4444',
                      color: '#ef4444',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#dc2626',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      px: 3,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                        boxShadow: '0 6px 16px rgba(30, 58, 138, 0.4)',
                      },
                      '&:disabled': {
                        background: '#e5e7eb',
                        color: '#9ca3af',
                      },
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Settings'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* Notification Component */}
      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={handleNotificationClose}
        autoHideDuration={5000}
      />
    </>
  );
};

export default MandatePage;
