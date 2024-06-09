import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduto } from './interfaces/produto.interface';
import { IProdutoPaginado } from './interfaces/produto-paginado.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.post<IProdutoPaginado>(
      'http://localhost:3000/produto/list',
      {}
    );
  }

  softDelete(id: number) {
    return this.http.delete(
      'http://localhost:3000/produto/ID/soft-delete'.replace(
        'ID',
        id.toString()
      )
    );
  }
}
