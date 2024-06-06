import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IItemBase } from './interfaces/item-base.interface';
import { FormControl } from '@angular/forms';
import { ICreateItemBase } from './interfaces/create-item-base.interface';
import { IEditItemBase } from './interfaces/edit-item-base.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemBaseService {
  constructor(private http: HttpClient) {}

  listItensBase() {
    return this.http.post<IItemBase[]>(
      'http://localhost:3000/item-base/list',
      {}
    );
  }

  salvar(dto: ICreateItemBase) {
    return this.http.post<IItemBase>('http://localhost:3000/item-base', dto);
  }

  softDelete(id: number) {
    return this.http.delete(
      `http://localhost:3000/item-base/ID/soft-delete`.replace(
        'ID',
        id.toString()
      )
    );
  }

  getItem(id: number) {
    return this.http.get<IItemBase>(
      'http://localhost:3000/item-base/ID'.replace('ID', id.toString())
    );
  }

  editar(id: number, dto: IEditItemBase) {
    return this.http.put<IItemBase>(
      'http://localhost:3000/item-base/ID'.replace('ID', id.toString()),
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
      return 'O nome não deve ter mais que 50 caractéres';
    }
    return '';
  }

  checkSelectForm(form: FormControl<string | null>): string {
    if (form.hasError('required')) {
      return 'A escolha do tipo é obrigatório';
    }
    return '';
  }
}
