import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const BasketCard = ({ basket }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 700,
                color: '#1e3a8a',
                mb: 1,
                fontSize: '1.5rem'
              }}
            >
              {basket.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
          </Box>
          
          {/* Growth Percentage */}
          <Box sx={{ textAlign: 'right' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
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
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#64748b',
            mb: 3,
            lineHeight: 1.5
          }}
        >
          {basket.description}
        </Typography>

        {/* Holdings Summary */}
        {basket.holdings && basket.holdings.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Top Holdings
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {basket.holdings.slice(0, 3).map((holding, index) => (
                <Chip
                  key={index}
                  label={holding.symbol}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#e5e7eb',
                    color: '#6b7280',
                    fontSize: '0.7rem',
                    height: '24px'
                  }}
                />
              ))}
              {basket.holdings.length > 3 && (
                <Chip
                  label={`+${basket.holdings.length - 3} more`}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#e5e7eb',
                    color: '#6b7280',
                    fontSize: '0.7rem',
                    height: '24px'
                  }}
                />
              )}
            </Box>
          </Box>
        )}

        {/* Invest Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
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
          Invest
        </Button>
      </CardContent>
    </Card>
  );
};

export default BasketCard;
