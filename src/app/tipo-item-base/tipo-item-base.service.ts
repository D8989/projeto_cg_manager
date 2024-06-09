import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITipoItemBase } from './interfaces/tipo-item-base.interface';
import { ICreateTipoItemBase } from './interfaces/create-tipo-item-base.interface';
import { FormControl } from '@angular/forms';
import { IEditTipoItemBase } from './interfaces/edit-tipo-item-base.interface';

@Injectable({
  providedIn: 'root',
})
export class TipoItemBaseService {
  constructor(private http: HttpClient) {}

  listTipos() {
    return this.http.get<ITipoItemBase[]>(
      'http://localhost:3000/tipo-item-base'
    );
  }

  insertTipo(dto: ICreateTipoItemBase) {
    return this.http.post<ITipoItemBase>(
      'http://localhost:3000/tipo-item-base',
      dto
    );
  }

  deleteTipo(id: number) {
    return this.http.delete(
      `http://localhost:3000/tipo-item-base/ID`.replace('ID', id.toString())
    );
  }

  getTipo(id: number) {
    return this.http.get<ITipoItemBase>(
      `http://localhost:3000/tipo-item-base/ID`.replace('ID', id.toString())
    );
  }

  editarTipo(id: number, dto: IEditTipoItemBase) {
    return this.http.put<ITipoItemBase>(
      `http://localhost:3000/tipo-item-base/ID`.replace('ID', id.toString()),
      dto
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
