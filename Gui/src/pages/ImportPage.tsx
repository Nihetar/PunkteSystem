import React, { useEffect, useState } from 'react';
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@mui/material';
import { SiteMap } from './SiteMap';
import { getAllSchwimmer, updateSchwimmer } from '../request';

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

const SchwimmerUpdate: React.FC = () => {
  const [data, setData] = useState<Schwimmer[]>([]);
  const [stil, setStil] = useState<Schwimmstil>('brust');

  useEffect(() => {
    getAllSchwimmer()
      .then(setData)
      .catch(err => console.error('Ladefehler:', err));
  }, []);

  const handleCheckboxChange = (id: number, field: string, checked: boolean) => {
    const updated = data.map(s => {
      if (s.id === id) {
        const updatedStyle = { ...s[stil], [field]: checked };
        const updatedSchwimmer = { ...s, [stil]: updatedStyle };
        updateSchwimmer(id, updatedSchwimmer).catch(console.error);
        return updatedSchwimmer;
      }
      return s;
    });
    setData(updated);
  };

  return (
    <Box p={4}>
      <SiteMap />
      <Typography variant="h5" gutterBottom>Schwimmer bearbeiten</Typography>

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
            {data[0] && Object.keys(data[0][stil]).map(field => (
              <TableCell key={field}>{field}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(s => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.gruppe}</TableCell>
              {Object.entries(s[stil]).map(([field, val]) => (
                <TableCell key={field} align="center">
                  <Checkbox
                    checked={val}
                    onChange={e => handleCheckboxChange(s.id, field, e.target.checked)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SchwimmerUpdate;
