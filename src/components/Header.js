// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 700, color: 'white' }}>
          Social Media Scheduler
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/" aria-label="Home" style={{ color: 'white' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/schedule" aria-label="Schedule Post" style={{ color: 'white' }}>
              Schedule Post
            </Button>
            <Button color="inherit" component={Link} to="/profile" aria-label="Profile" style={{ color: 'white' }}>
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout} aria-label="Logout" style={{ color: 'white' }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" aria-label="Login" style={{ color: 'white' }}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup" aria-label="Sign Up" style={{ color: 'white' }}>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;