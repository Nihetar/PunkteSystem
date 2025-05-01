import axios from 'axios';
import { SchwimmerDto } from './SchwimmerDto';

const baseUrl = process.env.REACT_APP_API_URL + '/schwimmer';

export const getAllSchwimmer = () => axios.get<SchwimmerDto[]>(baseUrl);

export const getSchwimmer = (id: number) => axios.get<SchwimmerDto>(`${baseUrl}/${id}`);

export const createSchwimmer = (dto: Omit<SchwimmerDto, 'id'>) =>
  axios.post<SchwimmerDto>(baseUrl, dto);

export const updateSchwimmer = (id: number, dto: Omit<SchwimmerDto, 'id'>) =>
  axios.put(`${baseUrl}/${id}`, dto);

export const deleteSchwimmer = (id: number) => axios.delete(`${baseUrl}/${id}`);
