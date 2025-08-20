import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert
} from '@mui/material';
import { protectedAPI } from '../services/api';
import BasketCard from '../components/Cards/BasketCard';
import InvestmentCard from '../components/Cards/InvestmentCard';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [investmentData, setInvestmentData] = useState(null);
  const [basketData, setBasketData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Always fetch both investment and basket data
      const [investmentResponse, basketResponse] = await Promise.all([
        protectedAPI.getInvestments(),
        protectedAPI.getBaskets()
      ]);

      console.log('Investment API Response:', investmentResponse);
      console.log('Basket API Response:', basketResponse);

      setInvestmentData(investmentResponse);
      setBasketData(basketResponse);

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      setError(error.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#1e3a8a', mb: 2 }}>
          Your Portfolio
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Welcome back!
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Investment Section */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e3a8a', mb: 3 }}>
            Your Investments
          </Typography>
          
          {investmentData && investmentData.data && investmentData.data.length > 0 ? (
            <Grid container spacing={3}>
              {investmentData.data.map((investment, index) => (
                <Grid item xs={12} lg={6} key={investment.basketId || index}>
                  <InvestmentCard investment={investment} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
              border: '1px solid rgba(0, 0, 0, 0.05)',
              backgroundColor: '#f8fafc'
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#64748b', mb: 2 }}>
                  You haven't invested yet
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Start your investment journey by exploring our curated baskets below
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Basket Section */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e3a8a', mb: 3, mt: 2 }}>
            Available Baskets
          </Typography>
          
          {basketData && basketData.data && basketData.data.length > 0 ? (
            <Grid container spacing={3}>
              {basketData.data.map((basket, index) => (
                <Grid item xs={12} md={6} lg={4} key={basket.id || index}>
                  <BasketCard basket={basket} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
              border: '1px solid rgba(0, 0, 0, 0.05)',
              backgroundColor: '#f8fafc'
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#64748b', mb: 2 }}>
                  No baskets available
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Check back later for new investment opportunities
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
