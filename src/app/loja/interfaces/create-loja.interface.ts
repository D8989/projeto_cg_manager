export interface ICreateLoja {
  nome: string;
  apelido: string;
  tipoLojaId: number;
  enderecoDto: {
    rua: string;
    cidade: string;
  };
}
