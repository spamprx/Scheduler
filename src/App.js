// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';  // Add this line
import { AuthProvider, useAuth } from './context/AuthContext';
import './globalStyles.css';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <div className="app-container">
      <Header />
      <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Paper elevation={3} className="content-paper">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<PrivateRoute><PostList /></PrivateRoute>} />
            <Route path="/schedule" element={<PrivateRoute><PostForm /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          </Routes>
        </Paper>
      </Container>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <Router>
              <AppContent />
            </Router>
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;