import { useState } from 'react';
import { Box, Button, TextField, CircularProgress } from '@mui/material';
import { saveSwimmingData } from '../request';
import { SiteMap } from './SiteMap';

export function ImportPage() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await saveSwimmingData(inputText);
      setInputText('');
    } catch {
      // Fehlerbehandlung könnte hier hinzugefügt werden
    }
    setLoading(false);
  };

  return (
    <Box p={4}>
      <SiteMap />
      <TextField
        placeholder="Nachname, Vorname, Geburtsdatum, Gruppe; ..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        multiline
        rows={10}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading || !inputText.trim()}
      >
        {loading ? <CircularProgress size={24} /> : 'Import starten'}
      </Button>
    </Box>
  );
}

export default ImportPage;
