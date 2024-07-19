import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Router>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 700 }}>
                  Social Media Scheduler
                </Typography>
                <Button color="inherit" component={Link} to="/" aria-label="Home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/schedule" aria-label="Schedule Post">
                  Schedule Post
                </Button>
              </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              <Paper elevation={3} style={{ padding: '2rem', borderRadius: '15px' }}>
                <Suspense fallback={<CircularProgress />}>
                  <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/schedule" element={<PostForm />} />
                  </Routes>
                </Suspense>
              </Paper>
            </Container>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;