import React from 'react';
import {
  Box,
  Container,
  Typography
} from '@mui/material';
import Navbar from '../components/Navbar';

const PublicLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <Container 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          py: 2,
          px: { xs: 1, sm: 2, md: 4 },
          maxWidth: '100%',
          margin: 0
        }}
      >
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Liquide. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicLayout;
