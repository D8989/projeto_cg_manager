import { ICompraItem } from './compra-item.interface';
import { ICompraPagamento } from './compra-pagamento.interface';

export interface ICompra {
  id: number;
  codigo: number;
  dataCompra: Date;
  lojaNome: string;
  valorTotal: number;
  itens: ICompraItem[];
  pagamentos: ICompraPagamento[];
}
