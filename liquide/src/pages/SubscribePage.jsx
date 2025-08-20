import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment,
  Divider,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ROUTES } from '../utils/config';
import { protectedAPI } from '../services/api';

const SubscribePage = () => {
  const navigate = useNavigate();
  const { basketId } = useParams();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [units, setUnits] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock basket data - in real app, fetch this from API
  const basketData = {
    name: "Growth Basket",
    currentValue: 1200,
    oneDayChangePct: 2.5,
    description: "Diversified growth stocks with low volatility."
  };

  const plans = {
    monthly: {
      name: 'Monthly Plan',
      price: 50,
      savings: 0,
      period: 'month',
      features: [
        'Full access to all baskets',
        'Real-time portfolio tracking',
        'Expert market insights',
        '24/7 customer support'
      ]
    },
    yearly: {
      name: 'Yearly Plan',
      price: 500,
      savings: 100,
      period: 'year',
      features: [
        'All monthly features included',
        '2 months free',
        'Priority customer support',
        'Exclusive investment opportunities',
        'Advanced analytics dashboard'
      ]
    }
  };

  const selectedPlanData = plans[selectedPlan];
  const totalPrice = selectedPlanData.price * units;
  const totalSavings = selectedPlanData.savings * units;

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleUnitsChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setUnits(value);
    }
  };

  const handleSubscribe = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await protectedAPI.subscribe({
        basketId,
        plan: selectedPlan,
        units,
      });

      if (res?.status === 'success') {
        navigate(ROUTES.MANDATE, { 
          replace: true,
          state: { basketId }
        });
        return;
      }

      // Fallback if status not success
      navigate(ROUTES.MANDATE, { 
        replace: true,
        state: { basketId }
      });
    } catch (err) {
      setError(err.message || 'Failed to process subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
          Subscribe to {basketData.name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Choose your subscription plan and start investing in curated baskets
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Plan Selection */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a', mb: 3 }}>
                Choose Your Plan
              </Typography>

              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={selectedPlan}
                  onChange={handlePlanChange}
                  sx={{ gap: 2 }}
                >
                  {Object.entries(plans).map(([key, plan]) => (
                    <Card
                      key={key}
                      sx={{
                        border: selectedPlan === key ? '2px solid #1e3a8a' : '1px solid #e5e7eb',
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#1e3a8a',
                          boxShadow: '0 4px 12px rgba(30, 58, 138, 0.1)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Radio
                            value={key}
                            sx={{
                              color: '#1e3a8a',
                              '&.Mui-checked': {
                                color: '#1e3a8a',
                              },
                            }}
                          />
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                              {plan.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
                                ${plan.price}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#64748b' }}>
                                /{plan.period}
                              </Typography>
                              {plan.savings > 0 && (
                                <Chip
                                  label={`Save $${plan.savings}`}
                                  size="small"
                                  sx={{
                                    backgroundColor: '#10b981',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.75rem'
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ ml: 4 }}>
                          {plan.features.map((feature, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <CheckCircleIcon sx={{ fontSize: 16, color: '#10b981', mr: 1 }} />
                              <Typography variant="body2" sx={{ color: '#374151' }}>
                                {feature}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Units Selection & Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 0, 0, 0.05)', height: 'fit-content', position: 'sticky', top: 24 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a', mb: 3 }}>
                Subscription Summary
              </Typography>

              {/* Units Selection */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#374151', mb: 1 }}>
                  Number of Units
                </Typography>
                <TextField
                  type="number"
                  value={units}
                  onChange={handleUnitsChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Units:</InputAdornment>,
                    inputProps: { min: 1, max: 100 }
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Price Breakdown */}
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Plan Price
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#374151' }}>
                    ${selectedPlanData.price} × {units}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#374151' }}>
                    ${selectedPlanData.price * units}
                  </Typography>
                </Box>
                {totalSavings > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: '#10b981' }}>
                      Savings
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
                      -${totalSavings}
                    </Typography>
                  </Box>
                )}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                    Total
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                    ${totalPrice}
                  </Typography>
                </Box>
              </Box>

              {/* Subscribe Button */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleSubscribe}
                disabled={loading}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                  fontWeight: 600,
                  fontSize: '1rem',
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
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Processing...' : `Subscribe for $${totalPrice}`}
              </Button>

              <Typography variant="caption" sx={{ color: '#64748b', textAlign: 'center', display: 'block', mt: 2 }}>
                You can cancel your subscription at any time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SubscribePage;
