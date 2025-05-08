import { SchwimmerDto } from './SchwimmerDto';

export interface GruppeDto {
  id: number;
  name: string;
  schwimmers: SchwimmerDto[];
}