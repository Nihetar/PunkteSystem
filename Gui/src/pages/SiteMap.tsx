import { Link } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

export function SiteMap() {
  return (
    <Box sx={{ bgcolor: 'grey.200', p: 2, mb: 4, borderRadius: 2, boxShadow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/update" variant="text" color="primary">
          Schwimmer bearbeiten
        </Button>
        <Button component={Link} to="/import" variant="text" color="primary">
          Schwimmer importieren
        </Button>
        <Button component={Link} to="/auswertung" variant="text" color="primary">
          Auswertung
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
        <Button component={Link} to="/login" variant="outlined" color="secondary">
          Anmelden
        </Button>
        <Button component={Link} to="/logout" variant="outlined" color="secondary">
          Abmelden
        </Button>
      </Stack>
    </Box>
  );
}