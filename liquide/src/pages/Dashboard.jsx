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
import BasketCard from './card';

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

      // First, call investment API
      const investmentResponse = await protectedAPI.getInvestments();
      console.log('Investment API Response:', investmentResponse);

      // Check if investment data is empty
      if (investmentResponse.status === 'success' && 
          investmentResponse.code === 200 && 
          (!investmentResponse.data || investmentResponse.data.length === 0)) {
        
        console.log('Investment data is empty, calling basket API...');
        
        // Call get basket API
        const basketResponse = await protectedAPI.getBaskets();
        console.log('Basket API Response:', basketResponse);
        setBasketData(basketResponse);
      } else {
        setInvestmentData(investmentResponse);
      }

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

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Investment Data Card */}
        {investmentData && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#1e3a8a' }}>
                  Investment Data
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {investmentData.status} | Code: {investmentData.code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data Items: {investmentData.data?.length || 0}
                </Typography>
                {investmentData.data && investmentData.data.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Investment Details:</strong>
                    </Typography>
                    <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                      {JSON.stringify(investmentData.data, null, 2)}
                    </pre>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Basket Data Cards */}
        {basketData && basketData.data && basketData.data.length > 0 && (
          <>
            {basketData.data.map((basket, index) => (
              <Grid item xs={12} md={6} lg={4} key={basket.id || index}>
                <BasketCard basket={basket} />
              </Grid>
            ))}
          </>
        )}

        {/* Basket Data Raw Display (if needed) */}
        {basketData && (!basketData.data || basketData.data.length === 0) && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: '#1e3a8a' }}>
                  Basket Data (Fetched after empty investment)
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {basketData.status} | Code: {basketData.code}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Data Items: {basketData.data?.length || 0}
                </Typography>
                {basketData.data && basketData.data.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Basket Details:</strong>
                    </Typography>
                    <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                      {JSON.stringify(basketData.data, null, 2)}
                    </pre>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
