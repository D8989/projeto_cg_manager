export interface ICompra {
  id: number;
  codigo: number;
  dataCompra: Date;
  lojaNome: string;
  valorTota: number;
  itens: {
    id: number;
    custo: number;
    gramatura: string;
    produtoNome: string;
    quantidade: string;
  }[];
  pagamentos: {
    id: number;
    formaPagamento: string;
    valor: number;
    usuarioNome: string;
  }[];
}
