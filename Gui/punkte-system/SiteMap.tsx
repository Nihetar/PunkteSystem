import React from 'react';
import { List, ListItemButton, ListItemText, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Sitemap: React.FC = () => (
  <Box p={2}>
    <Typography variant="h4" gutterBottom>
      Sitemap
    </Typography>
    <List>
      <ListItemButton component={RouterLink} to="/">
        <ListItemText primary="Übersicht" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/create">
        <ListItemText primary="Neuer Eintrag" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/sitemap">
        <ListItemText primary="Sitemap" />
      </ListItemButton>
    </List>
  </Box>
);
