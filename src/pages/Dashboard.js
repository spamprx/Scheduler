import React from 'react';
import { Container, Typography } from '@mui/material';
import PostList from '../components/PostList';

function Dashboard({ posts, onDelete }) {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Scheduled Posts
      </Typography>
      <PostList posts={posts} onDelete={onDelete} />
    </Container>
  );
}

export default Dashboard;