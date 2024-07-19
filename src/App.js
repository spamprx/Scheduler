import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import theme from './theme';

const PostList = lazy(() => import('./components/PostList'));
const PostForm = lazy(() => import('./components/PostForm'));

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    setPosts(storedPosts);
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleSubmit = async (newPost) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts([...posts, newPost]);
    } catch (err) {
      setError('Failed to add post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (index) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);
  };

  return (
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
            {error && <Typography color="error">{error}</Typography>}
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path="/" element={<PostList posts={posts} onDelete={handleDelete} />} />
                <Route path="/schedule" element={<PostForm onSubmit={handleSubmit} isLoading={isLoading} />} />
              </Routes>
            </Suspense>
          </Paper>
        </Container>
      </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;