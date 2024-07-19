import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

function PostList({ posts, onDelete }) {
  const sortedPosts = [...posts].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Scheduled Posts
      </Typography>
      {sortedPosts.length === 0 ? (
        <Typography>No posts scheduled yet.</Typography>
      ) : (
        <List>
          {sortedPosts.map((post, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={
                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                    {post.content}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {`${format(new Date(post.date), 'PPpp')} - ${post.platform}`}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton 
                  edge="end" 
                  aria-label="delete" 
                  onClick={() => onDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default PostList;