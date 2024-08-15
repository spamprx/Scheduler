// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link, Paper } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      setError('Failed to log in');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error("Google Sign-In Error:", error.code, error.message);
      setError('Failed to sign in with Google');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          required
        />
        <Button 
          type="submit" 
          fullWidth 
          variant="contained" 
          sx={{ mt: 3, mb: 2 }}
          style={{ backgroundColor: '#7c4dff', color: 'white' }}
        >
          LOGIN
        </Button>
        <Button 
          fullWidth 
          variant="outlined" 
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          sx={{ mt: 2, mb: 2 }}
        >
          Sign in with Google
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link component={RouterLink} to="/signup" color="primary">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Login;