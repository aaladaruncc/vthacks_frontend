import React from 'react';
import { Typography, Box, List, ListItem, ListItemIcon } from '@mui/material';
import DashIcon from '@mui/icons-material/Remove';

const FormText = () => {
  return (
    <Box sx={{ mb: 4, p: 2, backgroundColor: '#f0f4ff', borderRadius: '8px' }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Housing Preferences 🎉
      </Typography>

      <Typography variant="body1" sx={{ mb: 2, color: '#5a5a5a' }}>
        Let’s make sure you get the perfect home! 🎯 Here’s how:
      </Typography>

      <List sx={{ color: '#4a4a4a', padding: 0 }}>
        <ListItem sx={{ paddingLeft: 0, lineHeight: 1.4 }}>
          <ListItemIcon sx={{ minWidth: 'unset', color: '#90caf9', marginRight: 1 }}>
            <DashIcon fontSize="small" />
          </ListItemIcon>
          You tell us how close you want to be to campus, social spots, and more!
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemIcon sx={{ minWidth: 'unset', color: '#90caf9', marginRight: 1 }}>
            <DashIcon fontSize="small" />
          </ListItemIcon>
          Rate how important groceries, gyms, and restaurants are to you!
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemIcon sx={{ minWidth: 'unset', color: '#90caf9', marginRight: 1 }}>
            <DashIcon fontSize="small" />
          </ListItemIcon>
          The more detail, the better! 🏡
        </ListItem>
      </List>

      <Typography variant="body1" sx={{ mt: 2, color: '#5a5a5a' }}>
        Let’s dive in and find your perfect place!
      </Typography>
    </Box>
  );
};

export default FormText;
