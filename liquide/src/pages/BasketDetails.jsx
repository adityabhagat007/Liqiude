import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { protectedAPI } from '../services/api';
import { ROUTES } from '../utils/config';
import BasketChart from '../components/charts/BasketChart';

const BasketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [basketData, setBasketData] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBasketDetails();
    }
  }, [id]);

  const fetchBasketDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await protectedAPI.getBasketDetails(id);
      console.log('Basket Details Response:', response);
      setBasketData(response);
    } catch (error) {
      console.error('Basket details fetch error:', error);
      setError(error.message || 'Failed to fetch basket details');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const formatWeight = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress size={60} sx={{ color: '#1e3a8a' }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  const basket = basketData?.data?.[0];

  if (!basket) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Basket not found
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(ROUTES.DASHBOARD)}
          sx={{ mb: 2, color: '#1e3a8a' }}
        >
          Back to Dashboard
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 2 }}>
          {basket.name}
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          {basket.description}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Side - Basket Overview Card */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              height: 'fit-content',
              position: 'sticky',
              top: 24
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Basket Info */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    fontWeight: 700,
                    color: '#1e3a8a',
                    mb: 2,
                    fontSize: '1.5rem'
                  }}
                >
                  {basket.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Chip
                    label={basket.label}
                    size="small"
                    sx={{
                      backgroundColor: '#1e3a8a',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: '20px'
                    }}
                  />
                  <Chip
                    label={`${basket.risk} Risk`}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: '#1e3a8a',
                      color: '#1e3a8a',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: '20px'
                    }}
                  />
                </Box>

                {/* Growth and Value */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <TrendingUpIcon 
                      sx={{ 
                        color: basket.oneDayChangePct >= 0 ? '#10b981' : '#ef4444',
                        fontSize: '1.2rem'
                      }} 
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: basket.oneDayChangePct >= 0 ? '#10b981' : '#ef4444',
                        fontSize: '1.1rem'
                      }}
                    >
                      {formatPercentage(basket.oneDayChangePct)}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#1e3a8a',
                      fontSize: '1.8rem'
                    }}
                  >
                    {formatCurrency(basket.currentValue)}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#64748b',
                    lineHeight: 1.5
                  }}
                >
                  {basket.description}
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={() => navigate(`/subscribe/${id}`)}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                      boxShadow: '0 6px 16px rgba(30, 58, 138, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Subscribe
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: '#1e3a8a',
                    color: '#1e3a8a',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: '#1e40af',
                      backgroundColor: 'rgba(30, 58, 138, 0.1)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Invest
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - Holdings Table */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#1e3a8a',
                  mb: 3
                }}
              >
                Holdings
              </Typography>

              {basket.holdings && basket.holdings.length > 0 ? (
                <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e5e7eb' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                        <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Stock</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Weight</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Change</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {basket.holdings.map((holding, index) => (
                        <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f8fafc' } }}>
                          <TableCell sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                            {holding.symbol}
                          </TableCell>
                          <TableCell sx={{ color: '#374151' }}>
                            {holding.name}
                          </TableCell>
                          <TableCell sx={{ color: '#374151' }}>
                            {formatWeight(holding.weight)}
                          </TableCell>
                          <TableCell sx={{ color: '#374151' }}>
                            {formatCurrency(holding.price)}
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{
                                color: holding.changePct >= 0 ? '#10b981' : '#ef4444',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                              }}
                            >
                              <TrendingUpIcon 
                                sx={{ 
                                  fontSize: '1rem',
                                  color: holding.changePct >= 0 ? '#10b981' : '#ef4444'
                                }} 
                              />
                              {formatPercentage(holding.changePct)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No holdings data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart Section */}
      <Box sx={{ mt: 4 }}>
        <BasketChart basketId={id} />
      </Box>
    </Container>
  );
};

export default BasketDetails;
