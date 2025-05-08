import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { getAllSchwimmer } from '../request';
import { SiteMap } from './SiteMap';
import { SchwimmerDto } from '../SchwimmerDto';

export function Auswertung() {
  const [data, setData] = useState<SchwimmerDto[]>([]);

  useEffect(() => {
    getAllSchwimmer()
      .then(setData)
      .catch(err => console.error('Ladefehler:', err));
  }, []);

  return (
    <Box p={4}>
      <SiteMap />
      <Typography variant="h5" gutterBottom>Auswertung der Schwimmstile</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nachname</TableCell>
            <TableCell>Vorname</TableCell>
            <TableCell>Geburtsdatum</TableCell>
            <TableCell>Gruppe</TableCell>
            <TableCell>Fehleranzahl</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(s => (
            <TableRow key={s.id}>
              <TableCell>{s.nachname}</TableCell>
              <TableCell>{s.vorname}</TableCell>
              <TableCell>{new Date(s.geburtsdatum).toLocaleDateString()}</TableCell>
              <TableCell>{s.gruppe}</TableCell>
              <TableCell>{[...Object.values(s.brust), ...Object.values(s.kraul), ...Object.values(s.ruecken)].filter(v => v).length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
