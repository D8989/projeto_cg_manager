export interface IProduto {
  id: number;
  nome: string;
  descricao: string | null;
  quantidade: number;
  gramatura: string;
  marca: {
    id: number;
    nome: string;
    descricao: string | null;
  };
  itemBase: {
    id: number;
    nome: string;
    descricao: string | null;
    tipoItemBase: {
      id: number;
      nome: string;
    };
  };
}
