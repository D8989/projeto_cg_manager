import { ILoja } from './loja.interface';

export interface ILojaPaginado {
  total: number;
  dados: ILoja[];
}
