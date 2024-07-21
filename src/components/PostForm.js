import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { postsState } from "../recoil/postsState";
import { styled } from "@mui/material/styles";

const MAX_TWITTER_CHARS = 280;

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .required("Content is required")
    .max(
      MAX_TWITTER_CHARS,
      `Content exceeds maximum length of ${MAX_TWITTER_CHARS} characters for Twitter`
    ),
  date: Yup.date()
    .required("Date is required")
    .min(new Date(), "Please select a future date"),
  platform: Yup.string().required("Platform is required"),
  image: Yup.mixed().test("fileSize", "The file is too large", (value) => {
    if (!value) return true; // attachment is optional
    return value.size <= 5000000; // 5MB limit
  }),
});

const StyledDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    width: "100%",
  },
}));

const FormTextField = styled(TextField)({
  width: "100%",
  marginBottom: "1rem",
});

const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const setPosts = useSetRecoilState(postsState);

  const formik = useFormik({
    initialValues: {
      content: "",
      date: null,
      platform: "Twitter",
      image: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulating an API call
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() < 0.8) {
              resolve();
            } else {
              reject(new Error("Failed to schedule post"));
            }
          }, 1000);
        });
        setPosts((currentPosts) => [...currentPosts, values]);
        formik.resetForm();
        setSuccessMessage("Post scheduled successfully!");
      } catch (err) {
        console.error("Failed to add post:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Schedule a New Post
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <FormTextField
          name="content"
          label="Post Content"
          multiline
          rows={4}
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
          inputProps={{
            "aria-label": "Post content",
            maxLength: MAX_TWITTER_CHARS,
          }}
        />
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            mt: "-0.75rem", // Negative margin to move it up closer to the content box
            mb: "0.5rem", // Small margin bottom for spacing from the next element
            display: "block", // Ensures it's on its own line
          }}
        >
          {`${formik.values.content.length}/${MAX_TWITTER_CHARS}`}
        </Typography>
        <StyledDateTimePicker
          label="Schedule Date"
          value={formik.values.date}
          onChange={(newValue) => formik.setFieldValue("date", newValue)}
          renderInput={(params) => (
            <FormTextField
              {...params}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              inputProps={{
                ...params.inputProps,
                "aria-label": "Schedule date",
              }}
            />
          )}
          minDateTime={new Date()}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel id="platform-label">Platform</InputLabel>
          <Select
            labelId="platform-label"
            name="platform"
            value={formik.values.platform}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Platform"
            inputProps={{
              "aria-label": "Select platform",
            }}
          >
            <MenuItem value="Twitter">Twitter</MenuItem>
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="LinkedIn">LinkedIn</MenuItem>
          </Select>
        </FormControl>
        <input
          accept="image/*"
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="image-upload">
          <Button variant="outlined" component="span" fullWidth>
            Upload Image
          </Button>
        </label>
        {formik.values.image && (
          <Typography variant="body2">
            Selected file: {formik.values.image.name}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={isLoading || !formik.isValid}
          fullWidth
        >
          {isLoading ? "Scheduling..." : "Schedule Post"}
        </Button>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default PostForm;
