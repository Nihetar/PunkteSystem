import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7075/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Token bei jedem Request anhängen
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Automatisch abmelden bei 401 Unauthorized
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

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

export const getAllGroups = async () => {
  const response = await api.get('/Gruppen');
  return response.data;
};

export const createGroup = async (group: { name: string }) => {
  const response = await api.post('/Gruppen', group);
  return response.data;
};

export const updateGroupSwimmers = async (groupId: number, swimmerIds: number[]) => {
  await api.put(`/Gruppen/${groupId}/swimmers`, swimmerIds);
};
