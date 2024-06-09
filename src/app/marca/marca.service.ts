import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMarcaPaginado } from './interfaces/marca-paginado.interface';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.post<IMarcaPaginado>(
      'http://localhost:3000/marca/list',
      {}
    );
  }

  softDelete(id: number) {
    return this.http.delete('http://localhost:3000/marca/soft-delete', {
      body: { id },
    });
  }
}
