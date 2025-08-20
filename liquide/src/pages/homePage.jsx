import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import { ROUTES } from '../utils/config';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: '#1e3a8a' }} />,
      title: 'Smart Investment Baskets',
      description: 'Diversified portfolios designed by experts for optimal returns'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#1e3a8a' }} />,
      title: 'Secure & Transparent',
      description: 'Your investments are protected with bank-level security'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: '#1e3a8a' }} />,
      title: 'Easy to Use',
      description: 'Simple interface to manage your investments effortlessly'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: '#1e3a8a',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Welcome to Liquide
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#64748b',
              mb: 4,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Your gateway to intelligent investing. Discover curated investment baskets 
            designed to maximize your returns while minimizing risk.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleLoginClick}
            sx={{
              py: 2,
              px: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              fontWeight: 600,
              fontSize: '1.1rem',
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(30, 58, 138, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                boxShadow: '0 12px 32px rgba(30, 58, 138, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1e3a8a',
                      mb: 2
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#64748b',
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
              color: 'white'
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2
                }}
              >
                Ready to Start Investing?
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  opacity: 0.9
                }}
              >
                Join thousands of investors who trust Liquide for their financial future
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={handleLoginClick}
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: 3,
                  borderColor: 'white',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Login Now
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
