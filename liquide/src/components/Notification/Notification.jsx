import React, { useEffect } from 'react';
import { Snackbar, Alert, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

const Notification = ({ open, message, type = 'success', onClose, autoHideDuration = 6000 }) => {
  useEffect(() => {
    if (open && autoHideDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Success!';
      case 'error':
        return 'Error!';
      case 'warning':
        return 'Warning!';
      case 'info':
        return 'Info';
      default:
        return 'Success!';
    }
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiSnackbar-root': {
          top: 24,
          right: 24,
        },
      }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        icon={getIcon()}
        sx={{
          width: '100%',
          minWidth: 300,
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            {getTitle()}
          </Typography>
          <Typography variant="body2">
            {message}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default Notification;
