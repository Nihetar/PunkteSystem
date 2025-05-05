import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';

export function SiteMap() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ bgcolor: 'grey.200', p: 2, mb: 4, borderRadius: 2, boxShadow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/update" variant="text" color="primary" disabled={!isLoggedIn}>
          Schwimmer bearbeiten
        </Button>
        <Button component={Link} to="/import" variant="text" color="primary" disabled={!isLoggedIn}>
          Schwimmer importieren
        </Button>
        <Button component={Link} to="/auswertung" variant="text" color="primary" disabled={!isLoggedIn}>
          Auswertung
        </Button>
      </Stack>
      <Stack direction="row" spacing={2}>
        {isLoggedIn ? (
          <Button onClick={handleLogout} variant="outlined" color="secondary">
            Abmelden
          </Button>
        ) : (
          <Button component={Link} to="/login" variant="outlined" color="secondary">
            Anmelden
          </Button>
        )}
      </Stack>
    </Box>
  );
}
