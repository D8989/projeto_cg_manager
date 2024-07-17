export interface ICreateProduto {
  nome: string;
  descricao: string | null;
  quantidade: number | null;
  gramatura: string | null;
  marcaId: number;
  itemBaseId: number;
  hasEmbalagem: boolean;
}
