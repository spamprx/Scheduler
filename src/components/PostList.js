import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { format } from 'date-fns';
import { useRecoilState } from 'recoil';
import { postsState } from '../recoil/postsState';

const PostListItem = React.memo(({ post, onDelete, onEdit, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete(index);
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(index, { ...post, content: editedContent });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent(post.content);
    setIsEditing(false);
  };

  return (
    <ListItem divider>
      {isEditing ? (
        <>
          <TextField
            fullWidth
            multiline
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            variant="outlined"
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="save" onClick={handleSaveEdit}>
              <SaveIcon />
            </IconButton>
            <IconButton edge="end" aria-label="cancel" onClick={handleCancelEdit}>
              <CancelIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      ) : (
        <>
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
              aria-label="edit"
              onClick={handleEditClick}
              style={{ marginRight: '8px' }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              edge="end" 
              aria-label="delete" 
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ListItem>
  );
});

function PostList() {
  const [posts, setPosts] = useRecoilState(postsState);

  const handleDelete = (index) => {
    setPosts((currentPosts) => currentPosts.filter((_, i) => i !== index));
  };

  const handleEdit = (index, updatedPost) => {
    setPosts((currentPosts) =>
      currentPosts.map((post, i) => (i === index ? updatedPost : post))
    );
  };

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
            <PostListItem 
              key={index} 
              post={post} 
              onDelete={handleDelete} 
              onEdit={handleEdit}
              index={index} 
            />
          ))}
        </List>
      )}
    </>
  );
}

export default React.memo(PostList);