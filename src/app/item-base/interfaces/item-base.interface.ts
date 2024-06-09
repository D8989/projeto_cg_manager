export interface IItemBase {
  id: number;
  nome: string;
  descricao: string;
  tipoItemBase: {
    id: number;
    nome: string;
    descricao: string;
  };
}
