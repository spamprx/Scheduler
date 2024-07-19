import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Typography, FormControl, InputLabel } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSetRecoilState } from 'recoil';
import { postsState } from '../recoil/postsState';
import { styled } from '@mui/material/styles';

const MAX_TWITTER_CHARS = 280;

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required('Content is required')
    .max(MAX_TWITTER_CHARS, `Content exceeds maximum length of ${MAX_TWITTER_CHARS} characters for Twitter`),
  date: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Please select a future date'),
  platform: Yup.string().required('Platform is required'),
});

const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
  '& .MuiPickersDay-root': {
    fontSize: '0.8rem',
    padding: '0.3rem',
  },
  '& .MuiTypography-root': {
    fontSize: '0.9rem',
  },
  '& .MuiPickersCalendarHeader-label': {
    fontSize: '1rem',
  },
  '& .MuiPickersYear-yearButton': {
    fontSize: '0.9rem',
    padding: '0.3rem',
  },
  '& .MuiPickersMonth-root': {
    fontSize: '0.9rem',
    padding: '0.3rem',
  },
  '& .MuiPickersDay-dayLabel': {
    fontSize: '0.8rem',
  },
  '& .MuiPickersTimePickerToolbar-hourMinuteLabel': {
    fontSize: '2rem',
  },
  '& .MuiPickersClock-pin, & .MuiPickersClock-clock': {
    transform: 'scale(0.8)',
  },
  '& .MuiPickersClockNumber-clockNumber': {
    fontSize: '0.9rem',
  },
  '& ::-webkit-scrollbar': {
    width: '6px',
    height: '6px',
  },
  '& ::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.grey[400],
    borderRadius: '3px',
  },
  '& ::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setPosts = useSetRecoilState(postsState);

  const formik = useFormik({
    initialValues: {
      content: '',
      date: null,
      platform: 'Twitter',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPosts((currentPosts) => [...currentPosts, values]);
        formik.resetForm();
      } catch (err) {
        console.error('Failed to add post:', err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Schedule a New Post
      </Typography>
      <TextField
        name="content"
        label="Post Content"
        multiline
        rows={4}
        value={formik.values.content}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        margin="normal"
        variant="outlined"
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
      />
      <StyledDateTimePicker
        label="Schedule Date"
        value={formik.values.date}
        onChange={(newValue) => formik.setFieldValue('date', newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            margin="normal"
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
        )}
        minDateTime={new Date()}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Platform</InputLabel>
        <Select
          name="platform"
          value={formik.values.platform}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
        disabled={isLoading || !formik.isValid}
      >
        {isLoading ? 'Scheduling...' : 'Schedule Post'}
      </Button>
    </form>
  );
};

export default PostForm;