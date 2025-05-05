import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Divider
} from '@mui/material';
import { getAllSchwimmer, getAllGroups, createGroup, updateGroupSwimmers } from '../request';
import { SiteMap } from './SiteMap';

interface Schwimmer {
  id: number;
  vorname: string;
  nachname: string;
  gruppenId: number;
}

interface Gruppe {
  id: number;
  name: string;
  schwimmer: Schwimmer[];
}

export function GroupPage() {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<Gruppe[]>([]);
  const [swimmers, setSwimmers] = useState<Schwimmer[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedSwimmerIds, setSelectedSwimmerIds] = useState<number[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [groupData, swimmerData] = await Promise.all([
      getAllGroups(),
      getAllSchwimmer()
    ]);
    setGroups(groupData);
    setSwimmers(swimmerData);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    const newGroup = await createGroup({ name: groupName });
    setGroups([...groups, newGroup]);
    setGroupName('');
  };

  const handleToggleSwimmer = (id: number) => {
    setSelectedSwimmerIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAssignSwimmers = async () => {
    if (selectedGroupId == null) return;
    await updateGroupSwimmers(selectedGroupId, selectedSwimmerIds);
    await fetchData();
  };

  return (
    <Box p={4}>
      <SiteMap />
      <Typography variant="h5" gutterBottom>Gruppe verwalten</Typography>

      <Box mb={2}>
        <TextField
          label="Neue Gruppe"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleCreateGroup}>Erstellen</Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6">Schwimmer zu Gruppe zuweisen</Typography>

      <TextField
        select
        SelectProps={{ native: true }}
        label="Gruppe auswählen"
        value={selectedGroupId ?? ''}
        onChange={(e) => setSelectedGroupId(Number(e.target.value))}
        sx={{ my: 2, minWidth: 200 }}
      >
        <option value="" disabled>Gruppe wählen</option>
        {groups.map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </TextField>

      <Paper variant="outlined" sx={{ p: 2, maxHeight: 300, overflow: 'auto' }}>
        {swimmers.map(swimmer => (
          <FormControlLabel
            key={swimmer.id}
            control={
              <Checkbox
                checked={selectedSwimmerIds.includes(swimmer.id)}
                onChange={() => handleToggleSwimmer(swimmer.id)}
              />
            }
            label={`${swimmer.vorname} ${swimmer.nachname}`}
          />
        ))}
      </Paper>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleAssignSwimmers}
        disabled={selectedGroupId == null}
      >
        Zu Gruppe zuweisen
      </Button>
    </Box>
  );
}
