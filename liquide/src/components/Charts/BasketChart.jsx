import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { protectedAPI } from '../../services/api';

const BasketChart = ({ 
  basketId,
  title = "Performance Chart",
  yAxisLabel = "Value",
  dataKey = "value",
  xAxisDataKey = "timestamp",
  yAxisFormatter = (value) => `$${value}`,
  periods = [
    { label: '1w', value: '1w' },
    { label: '1m', value: '1m' },
    { label: '6m', value: '6m' },
    { label: '1y', value: '1y' },
  ],
  defaultPeriod = '1w',
  apiFunction = protectedAPI.getBasketChart,
  dataTransformer = (data) => data.map(item => ({
    timestamp: new Date(item.timestamp).toLocaleDateString(),
    value: parseFloat(item.value.toFixed(2)),
    rawTimestamp: item.timestamp
  })),
  tooltipFormatter = (value) => `$${value}`,
  lineColor = "#1e3a8a",
  lineWidth = 3,
  showGrid = true,
  gridColor = "#f0f0f0",
  height = 400
}) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriod);

  useEffect(() => {
    if (basketId) {
      fetchChartData(selectedPeriod);
    }
  }, [basketId, selectedPeriod]);

  const fetchChartData = async (period) => {
    try {
      setLoading(true);
      setError('');
      const response = await apiFunction(basketId, period);
      console.log('Chart Data Response:', response);
      
      if (response.status === 'success' && response.data) {
        const transformedData = dataTransformer(response.data);
        setChartData(transformedData);
      } else {
        setError('No chart data available');
      }
    } catch (error) {
      console.error('Chart data fetch error:', error);
      setError(error.message || 'Failed to fetch chart data');
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: 2,
            p: 2,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="body2" sx={{ color: '#374151', fontWeight: 600 }}>
            {label}
          </Typography>
          <Typography variant="body2" sx={{ color: lineColor, fontWeight: 600 }}>
            {yAxisLabel}: {tooltipFormatter(payload[0].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  if (loading) {
    return (
      <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <CircularProgress size={40} sx={{ color: lineColor }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(0, 0, 0, 0.05)' }}>
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: lineColor
            }}
          >
            {title}
          </Typography>
          
          {/* Period Selector */}
          {periods.length > 0 && (
            <ButtonGroup variant="outlined" size="small">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  onClick={() => handlePeriodChange(period.value)}
                  sx={{
                    borderColor: selectedPeriod === period.value ? lineColor : '#e5e7eb',
                    color: selectedPeriod === period.value ? lineColor : '#6b7280',
                    backgroundColor: selectedPeriod === period.value ? `${lineColor}15` : 'transparent',
                    fontWeight: selectedPeriod === period.value ? 600 : 400,
                    '&:hover': {
                      borderColor: lineColor,
                      backgroundColor: `${lineColor}15`,
                    },
                    minWidth: '40px',
                    px: 1.5
                  }}
                >
                  {period.label}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Chart */}
        {chartData.length > 0 && !error ? (
          <Box sx={{ width: '100%', height }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />}
                <XAxis
                  dataKey={xAxisDataKey}
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={yAxisFormatter}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={lineColor}
                  strokeWidth={lineWidth}
                  dot={false}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        ) : !error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <Typography variant="body2" color="text.secondary">
              No chart data available
            </Typography>
          </Box>
        ) : null}

        {/* Chart Info */}
        {chartData.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Data points: {chartData.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Period: {selectedPeriod}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default BasketChart;
