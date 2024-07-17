import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ITipoLojaPaginado } from './interfaces/tipo-loja-paginado.interface';
import { ICreateTipoLoja } from './interfaces/create-tipo-loja.interface';
import { ITipoLoja } from './interfaces/tipo-loja.interface';
import { FormControl } from '@angular/forms';
import { IUpdateTipoLoja } from './interfaces/update-tipo-loja.interface';

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

  insert(dto: ICreateTipoLoja) {
    return this.http.post<ITipoLoja>(environment.apiUrl + 'tipo-loja', dto, {});
  }

  getTipo(id: number) {
    return this.http.get<ITipoLoja>(
      `http://localhost:3000/tipo-loja/ID`.replace('ID', id.toString()),
      {}
    );
  }

  update(id: number, dto: IUpdateTipoLoja) {
    return this.http.put<ITipoLoja>(
      `http://localhost:3000/tipo-loja/ID`.replace('ID', id.toString()),
      dto,
      {}
    );
  }

  checkNomeForm(nomeForm: FormControl<string | null>): string {
    if (nomeForm.hasError('required')) {
      return 'O nome é obrigatório';
    }
    if (nomeForm.hasError('minLength')) {
      return 'O nome não deve ser uma string vazia';
    }
    if (nomeForm.hasError('maxLength')) {
      return 'O nome não deve ter mais que 20 caractéres';
    }
    return '';
  }
}
