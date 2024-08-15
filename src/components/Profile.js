import React, { useState } from 'react';
import { Typography, Paper, Box, Button, TextField } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user.displayName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = async () => {
    try {
      await updateUserProfile({ displayName, phoneNumber, bio });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" gutterBottom>
          {isEditing ? 'Edit Profile' : 'User Profile'}
        </Typography>
        
        <TextField
          fullWidth
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={!isEditing}
          margin="normal"
        />
        
        <TextField
          fullWidth
          label="Email"
          value={user.email}
          disabled
          margin="normal"
        />
        
        <TextField
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={!isEditing}
          margin="normal"
        />
        
        <TextField
          fullWidth
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          disabled={!isEditing}
          multiline
          rows={4}
          margin="normal"
        />
        
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Account created: {user.metadata.creationTime}
        </Typography>
        
        {isEditing ? (
          <Button 
            variant="contained" 
            onClick={handleSave}
            sx={{ mt: 3, mr: 2 }}
          >
            Save Changes
          </Button>
        ) : (
          <Button 
            variant="contained" 
            onClick={() => setIsEditing(true)}
            sx={{ mt: 3, mr: 2 }}
          >
            Edit Profile
          </Button>
        )}
        
        <Button 
          variant="contained" 
          onClick={logout}
          sx={{ mt: 3 }}
          color="secondary"
        >
          Logout
        </Button>
      </Box>
    </Paper>
  );
};

export default Profile;