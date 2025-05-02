import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { SchwimmerDto } from '../SchwimmerDto';
import { calculatePointsForSwimmer } from '../punkte/PunkteCalculator';
import { request } from '../request';

export const AuswertungPage: React.FC = () => {
  const [swimmers, setSwimmers] = useState<SchwimmerDto[]>([]);

  useEffect(() => {
    async function data() {
    setSwimmers(await request<SchwimmerDto[]>('schwimmer', 'GET'));;
    }
    data();
  }, []);

  const withPoints = swimmers.map(s => ({ ...s, punkte: calculatePointsForSwimmer(s) }));
  // Sortierung aufsteigend
  const sorted = withPoints.sort((a, b) => a.punkte - b.punkte);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Auswertung
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Schwimmer</TableCell>
            <TableCell align="right">Punkte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map(s => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell align="right">{s.punkte}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
