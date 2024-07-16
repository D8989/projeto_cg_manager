import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITipoLojaPaginado } from './interfaces/tipo-loja-paginado.interface';

@Injectable({
  providedIn: 'root',
})
export class TipoLojaService {
  constructor(private http: HttpClient) {}

  listPaginado() {
    return this.http.post<ITipoLojaPaginado>(
      environment.apiUrl + 'tipo-loja/list',
      {},
      {}
    );
  }

  softDelete(id: number) {
    return this.http.delete(environment.apiUrl + `tipo-loja/${id}/soft`, {});
  }
}
