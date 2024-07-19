import React from 'react';
import { Container, Typography } from '@mui/material';
import PostForm from '../components/PostForm';

function Schedule({ onSubmit }) {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Schedule a New Post
      </Typography>
      <PostForm onSubmit={onSubmit} />
    </Container>
  );
}

export default Schedule;