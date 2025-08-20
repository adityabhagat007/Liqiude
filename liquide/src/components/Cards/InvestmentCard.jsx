import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ScheduleIcon from '@mui/icons-material/Schedule';

const InvestmentCard = ({ investment }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPeriodColor = (period) => {
    switch (period) {
      case 'weekly':
        return '#10b981';
      case 'monthly':
        return '#3b82f6';
      case 'yearly':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
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
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography
              variant="h5"
              component="h3"
              sx={{
                fontWeight: 700,
                color: '#1e3a8a',
                mb: 1,
                fontSize: '1.3rem'
              }}
            >
              Basket: {investment.basketId}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <AccountBalanceWalletIcon sx={{ fontSize: 16 }} />
              {investment.userMobile}
            </Typography>
          </Box>
          <Chip
            label="Active"
            size="small"
            sx={{
              backgroundColor: '#10b981',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem'
            }}
          />
        </Box>

        {/* Investment Summary */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151' }}>
              Total Investment
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e3a8a' }}>
              {formatCurrency(investment.totalInvested)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Total Units
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
              {investment.units}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Subscriptions */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: '#374151',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <ScheduleIcon sx={{ fontSize: 20 }} />
            Subscriptions ({investment.subscriptions.length})
          </Typography>
          
          <List sx={{ p: 0 }}>
            {investment.subscriptions.map((subscription, index) => (
              <ListItem
                key={index}
                sx={{
                  p: 0,
                  mb: 1,
                  backgroundColor: '#f8fafc',
                  borderRadius: 2,
                  px: 2,
                  py: 1.5
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={subscription.period}
                        size="small"
                        sx={{
                          backgroundColor: getPeriodColor(subscription.period),
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          textTransform: 'capitalize'
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e3a8a' }}>
                        {formatCurrency(subscription.amount)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {subscription.units} units
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#64748b' }}>
                        {formatDate(subscription.date)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Mandate Status */}
        {investment.mandate && Object.keys(investment.mandate).length > 0 ? (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: '#374151',
                mb: 1
              }}
            >
              Mandate Status
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Mandate configured
            </Typography>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                color: '#ef4444',
                mb: 1
              }}
            >
              Mandate Status
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              No mandate configured
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestmentCard;
