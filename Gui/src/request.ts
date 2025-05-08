import axios, { AxiosResponse } from 'axios';
import { SchwimmerDto } from './SchwimmerDto';
import { GruppeDto } from './GruppenDto';

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

export const saveSwimmingData = async (input: { text: string }): Promise<void> => {
  await api.post<void>('/Schwimmer/SaveSwimmingData', input);
};

export const getAllSchwimmer = async (): Promise<SchwimmerDto[]> => {
  const response: AxiosResponse<SchwimmerDto[]> = await api.get<SchwimmerDto[]>('/Schwimmer');
  return response.data;
};

export const updateSchwimmer = async (id: number, schwimmer: SchwimmerDto): Promise<void> => {
  await api.put<void>(`/Schwimmer/${id}`, schwimmer);
};

export const getAllGroups = async (): Promise<GruppeDto[]> => {
  const resp = await api.get<GruppeDto[]>('/Gruppen');
  return resp.data;
};

export const createGroup = async (group: { name: string }): Promise<GruppeDto> => {
  const resp = await api.post<GruppeDto>('/Gruppen', group);
  return resp.data;
};

export const updateGroupSwimmers = async (groupId: number, swimmerIds: number[]): Promise<void> => {
  await api.put<void>(`/Gruppen/${groupId}/swimmers`, swimmerIds);
};

