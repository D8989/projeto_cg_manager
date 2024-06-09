import { IMarca } from './marca.interface';

export interface IMarcaPaginado {
  total: number;
  dados: IMarca[];
}
