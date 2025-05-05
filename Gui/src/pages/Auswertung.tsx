import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { getAllSchwimmer } from '../request';
import { SiteMap } from './SiteMap';

interface Schwimmer {
  id: number;
  name: string;
  gruppe: string;
  brust: Record<string, boolean>;
  kraul: Record<string, boolean>;
  ruecken: Record<string, boolean>;
}

const schwimmstile = ['brust', 'kraul', 'ruecken'] as const;
type Schwimmstil = typeof schwimmstile[number];

export function Auswertung() {
  const [data, setData] = useState<Schwimmer[]>([]);
  const [stil, setStil] = useState<Schwimmstil>('brust');

  useEffect(() => {
    getAllSchwimmer()
      .then(setData)
      .catch(err => console.error('Ladefehler:', err));
  }, []);

  const getFehlerAnzahl = (werte: Record<string, boolean>) => {
    return Object.values(werte).filter(v => v).length;
  };

  return (
    <Box p={4}>
      <SiteMap />
      <Typography variant="h5" gutterBottom>Auswertung der Schwimmstile</Typography>

      <FormControl sx={{ mb: 3, minWidth: 200 }}>
        <InputLabel id="stil-label">Schwimmstil</InputLabel>
        <Select
          labelId="stil-label"
          value={stil}
          label="Schwimmstil"
          onChange={e => setStil(e.target.value as Schwimmstil)}
        >
          {schwimmstile.map(s => (
            <MenuItem key={s} value={s}>{s.toUpperCase()}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gruppe</TableCell>
            <TableCell>Fehleranzahl</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(s => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.gruppe}</TableCell>
              <TableCell>{getFehlerAnzahl(s[stil])}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
