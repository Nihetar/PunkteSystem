import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Checkbox,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { SchwimmerDto } from '../SchwimmerDto';
import { request } from '../request';

const niceLabel = (key: string) =>
  key
    .replace(/_/g, ' ')
    .replace(/rücken/g, 'Rücken')
    .replace(/kraul/g, 'Kraul')
    .replace(/brust/g, 'Brust');

export function UpdatePage() {
  const [rows, setRows] = useState<SchwimmerDto[]>([]);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    request<SchwimmerDto[]>('schwimmer', 'GET')
      .then(data => setRows(data))
      .catch(err => console.error('Fehler beim Laden:', err));
  }, []);

  const handleCellChange = (
    id: number,
    field: keyof SchwimmerDto,
    checked: boolean
  ) => {
    const updated = rows.map(r =>
      r.id === id ? { ...r, [field]: checked } : r
    );
    setRows(updated);
    const { id: _, punkte, ...rest } = updated.find(r => r.id === id)!;
    request(`schwimmer/${id}`, 'PUT', rest).catch(err =>
      console.error('Fehler beim Speichern:', err)
    );
  };

  const booleanFields = Object.keys(rows[0] || {})
    .filter(key => key !== 'id' && key !== 'name' && key !== 'punkte') as (keyof SchwimmerDto)[];

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Schwimmer', flex: 1, minWidth: 150 },
    ...booleanFields.map(field => ({
      field,
      headerName: niceLabel(field),
      flex: 0.6,
      minWidth: isSmall ? 120 : 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          checked={Boolean(params.row[field])}
          onChange={e =>
            handleCellChange(
              params.row.id,
              field,
              e.target.checked
            )
          }
        />
      )
    }))
  ];

  return (
    <Container maxWidth="lg" sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant={isSmall ? 'h5' : 'h4'} gutterBottom>
        Update
      </Typography>
      <Box sx={{ height: '70vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          autoHeight
        />
      </Box>
    </Container>
  );
};
