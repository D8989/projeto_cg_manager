import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICompraRowPaginado } from './interfaces/compra-row-paginado.interface';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.post<ICompraRowPaginado>(
      environment.apiUrl + 'compra/list',
      {}
    );
  }
}
