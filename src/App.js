import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Button, Paper } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RecoilRoot } from 'recoil';
import theme from './theme';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './globalStyles.css';  // Import the new CSS file

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Router>
            <div className="app-container">
              <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 700, color: 'white' }}>
                    Social Media Scheduler
                  </Typography>
                  <Button color="inherit" component={Link} to="/" aria-label="Home" style={{ color: 'white' }}>
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/schedule" aria-label="Schedule Post" style={{ color: 'white' }}>
                    Schedule Post
                  </Button>
                </Toolbar>
              </AppBar>
              <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <Paper elevation={3} className="content-paper">
                  <Routes>
                    <Route path="/" element={<PostList />} />
                    <Route path="/schedule" element={<PostForm />} />
                  </Routes>
                </Paper>
              </Container>
            </div>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;