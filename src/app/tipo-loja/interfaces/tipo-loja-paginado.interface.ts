import { ITipoLoja } from './tipo-loja.interface';

export interface ITipoLojaPaginado {
  total: number;
  dados: ITipoLoja[];
}
