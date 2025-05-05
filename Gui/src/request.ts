import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const saveSwimmingData = async (inputText: string): Promise<void> => {
  try {
    await api.post('/Schwimmer/SaveSwimmingData', inputText);
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    throw error;
  }
};

export const getAllSchwimmer = async () => {
  const response = await api.get('/Schwimmer');
  return response.data;
};

export const updateSchwimmer = async (id: number, schwimmer: any) => {
  await api.put(`/Schwimmer/${id}`, schwimmer);
};
