import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { SiteMap } from './SiteMap';

export function HomePage() {
  return (
    <Box p={4}>
      <SiteMap />
      <Typography variant="h3" gutterBottom>
        Willkommen zum Punkte System
      </Typography>
      <Typography variant="body1" paragraph>
        Diese Anwendung dient der Verwaltung und Auswertung von Schwimmerdaten nach Schwimmstilen. 
        Nutzen Sie die Navigation oben, um Schwimmer zu bearbeiten, neue Daten zu importieren oder Auswertungen durchzuführen.
      </Typography>
      <Stack direction="row" spacing={2} mt={4}>
        <Button component={Link} to="/update" variant="contained" color="primary">
          Jetzt Schwimmer bearbeiten
        </Button>
        <Button component={Link} to="/import" variant="outlined" color="secondary">
          Daten importieren
        </Button>
      </Stack>
    </Box>
  );
};
