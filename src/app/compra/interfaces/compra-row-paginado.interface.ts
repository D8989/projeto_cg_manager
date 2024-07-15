import { ICompraRow } from './compra-row.interface';

export interface ICompraRowPaginado {
  total: number;
  dados: ICompraRow[];
}
