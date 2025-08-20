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
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      handleMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local storage and redirect
      handleMenuClose();
      navigate('/');
    }
  };

  const menuItems = [
    { text: 'Dashboard', path: '/dashboard' },
    { text: 'Profile', path: '/dashboard' },
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
        <ListItem 
          button 
          onClick={handleLogout}
          sx={{
            marginTop: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#ef4444'
          }}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: '#ef4444' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
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
              <IconButton
                onClick={handleAvatarClick}
                sx={{ p: 0 }}
              >
                <Avatar 
                  sx={{ 
                    width: 36,
                    height: 36,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)'
                    }
                  }}
                >
                  AD
                </Avatar>
              </IconButton>
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

      {/* User Menu Dropdown */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 180,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            borderRadius: 2,
            border: '1px solid rgba(0, 0, 0, 0.05)'
          }
        }}
      >
        <MenuItem onClick={() => { handleNavigation('/dashboard'); handleMenuClose(); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem 
          onClick={handleLogout}
          sx={{ 
            color: '#ef4444',
            '&:hover': {
              backgroundColor: '#fef2f2'
            }
          }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
