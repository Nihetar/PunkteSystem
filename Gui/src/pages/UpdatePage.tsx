import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox
} from '@mui/material';
import { getAllSchwimmer, updateSchwimmer } from '../request';
import { SiteMap } from './SiteMap';

interface Schwimmer {
  id: number;
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  gruppe: string;
  brust: Record<string, boolean>;
  kraul: Record<string, boolean>;
  ruecken: Record<string, boolean>;
  grundfertigkeiten: Record<string, boolean>;
}

const kategorien = ['brust', 'kraul', 'ruecken', 'grundfertigkeiten'] as const;
type Kategorie = typeof kategorien[number];

export function UpdatePage() {
  const [data, setData] = useState<Schwimmer[]>([]);
  const [changed, setChanged] = useState<Set<number>>(new Set());
  const [stil, setStil] = useState<Kategorie>('brust');
  const [gruppen, setGruppen] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  useEffect(() => {
    getAllSchwimmer()
      .then(schwimmer => {
        setData(schwimmer);
        const gruppenSet = new Set<string>(schwimmer.map(s => s.gruppe));
        setGruppen(Array.from(gruppenSet));
      })
      .catch(err => console.error('Ladefehler:', err));
  }, []);

  const handleCheckboxChange = (id: number, field: string, checked: boolean) => {
    const updated = data.map(s => {
      if (s.id === id) {
        const updatedStyle = { ...s[stil], [field]: checked };
        const updatedSchwimmer = { ...s, [stil]: updatedStyle };
        return updatedSchwimmer;
      }
      return s;
    });
    setData(updated);
    setChanged(prev => new Set(prev).add(id));
  };

  const handleSaveChanges = async () => {
    for (const id of changed) {
      const s = data.find(d => d.id === id);
      if (s) await updateSchwimmer(id, s);
    }
    setChanged(new Set());
  };

  const filteredData = selectedGroup
    ? data.filter(s => s.gruppe === selectedGroup)
    : data;

  return (
    <Box p={4}>
      <SiteMap />
      <Typography variant="h5" gutterBottom>Schwimmer bearbeiten</Typography>

      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="stil-label">Kategorie</InputLabel>
          <Select
            labelId="stil-label"
            value={stil}
            label="Kategorie"
            onChange={e => setStil(e.target.value as Kategorie)}
          >
            {kategorien.map(s => (
              <MenuItem key={s} value={s}>{s.toUpperCase()}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="gruppe-label">Gruppe</InputLabel>
          <Select
            labelId="gruppe-label"
            value={selectedGroup}
            label="Gruppe"
            onChange={e => setSelectedGroup(e.target.value)}
          >
            <MenuItem value="">Alle</MenuItem>
            {gruppen.map(g => (
              <MenuItem key={g} value={g}>{g}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          disabled={changed.size === 0}
        >
          Änderungen speichern
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nachname</TableCell>
            <TableCell>Vorname</TableCell>
            {filteredData[0] && filteredData[0][stil] && Object.keys(filteredData[0][stil]).map(field => {
              const readableField = field.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
              return <TableCell key={field}>{readableField}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map(s => (
            <TableRow key={s.id}>
              <TableCell>{s.nachname}</TableCell>
              <TableCell>{s.vorname}</TableCell>
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
