export interface ICreateProduto {
  nome: string;
  descricao: string | null;
  quantidade: number;
  gramatura: string;
  marcaId: number;
  itemBaseId: number;
}
