import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMarcaPaginado } from './interfaces/marca-paginado.interface';
import { FormControl } from '@angular/forms';
import { ICreateMarca } from './interfaces/create-marca.interface';
import { IMarca } from './interfaces/marca.interface';

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

  insertMarca(dto: ICreateMarca) {
    return this.http.post<IMarca>('http://localhost:3000/marca', dto);
  }

  checkNomeForm(nomeForm: FormControl<string | null>): string {
    if (nomeForm.hasError('required')) {
      return 'O nome é obrigatório';
    }
    if (nomeForm.hasError('minLength')) {
      return 'O nome não deve ser uma string vazia';
    }
    if (nomeForm.hasError('maxLength')) {
      return 'O nome não deve ter mais que 50 caractéres';
    }
    return '';
  }
}
