import { IProduto } from './produto.interface';

export interface IProdutoPaginado {
  total: number;
  dados: IProduto[];
}
