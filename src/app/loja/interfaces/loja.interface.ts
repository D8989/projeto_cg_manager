export interface ILoja {
  id: number;
  nome: string;
  apelido: string;
  tipoLoja: {
    id: number;
    nome: string;
    descricao: string;
  };
  enderecoDto: {
    rua: string;
    numero: string;
    cep: string;
    cidade: string;
    bairro: string;
    referencia: string;
  };
}
