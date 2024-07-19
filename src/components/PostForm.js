import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Typography, FormControl, InputLabel } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function PostForm({ onSubmit, isLoading }) {
  const [post, setPost] = useState({ content: '', date: null, platform: 'Twitter' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleDateChange = (newDate) => {
    setPost({ ...post, date: newDate });
    setErrors({ ...errors, date: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!post.content) newErrors.content = 'Content is required';
    if (!post.date) newErrors.date = 'Date is required';
    if (post.date && post.date < new Date()) newErrors.date = 'Please select a future date';
    if (post.platform === 'Twitter' && post.content.length > MAX_TWITTER_CHARS) {
      newErrors.content = `Content exceeds maximum length of ${MAX_TWITTER_CHARS} characters for Twitter`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...post,
        date: post.date ? format(post.date, "yyyy-MM-dd'T'HH:mm") : null
      });
      setPost({ content: '', date: null, platform: 'Twitter' });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Schedule a New Post
      </Typography>
      <TextField
        name="content"
        label="Post Content"
        multiline
        rows={4}
        value={post.content}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.content}
        helperText={errors.content || `${post.content.length}/280`}
      />
      <DateTimePicker
        label="Schedule Date"
        value={post.date}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        minDateTime={new Date()}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Platform</InputLabel>
        <Select
          name="platform"
          value={post.platform}
          onChange={handleChange}
        >
          <MenuItem value="Twitter">Twitter</MenuItem>
          <MenuItem value="Facebook">Facebook</MenuItem>
          <MenuItem value="LinkedIn">LinkedIn</MenuItem>
        </Select>
      </FormControl>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        size="large"
        style={{ marginTop: '1rem' }}
        disabled={isLoading}
      >
        {isLoading ? 'Scheduling...' : 'Schedule Post'}
      </Button>
    </form>
  </LocalizationProvider>
);
}

export default PostForm;