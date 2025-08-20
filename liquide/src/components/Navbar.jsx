import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Profile', path: '/profile' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => handleNavigation(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          backgroundColor: '#1e3a8a',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              cursor: 'pointer',
              fontWeight: 600,
              color: 'white',
              mr: 4
            }}
            onClick={() => handleNavigation('/')}
          >
            Stock Baskets
          </Typography>
          
          {isMobile ? (
            <>
              {/* Mobile: Menu button on right */}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              {/* Desktop: Navigation buttons on left */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      color: 'white',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
              
              {/* Spacer to push avatar to right */}
              <Box sx={{ flexGrow: 1 }} />
              
              {/* Avatar on right */}
              <Avatar 
                sx={{ 
                  width: 36,
                  height: 36,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                J
              </Avatar>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 250,
            backgroundColor: '#1e3a8a',
            color: 'white'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
