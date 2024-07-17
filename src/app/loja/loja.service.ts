import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILojaPaginado } from './interfaces/loja-paginado.interface';
import { environment } from '../../environments/environment';
import { IMessageResp } from '../common/res/message-resp.interface';
import { ICreateLoja } from './interfaces/create-loja.interface';
import { ILoja } from './interfaces/loja.interface';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LojaService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.post<ILojaPaginado>(
      environment.apiUrl + 'loja/list',
      {},
      {}
    );
  }

  softDelete(id: number) {
    return this.http.delete<IMessageResp>(
      environment.apiUrl + `loja/${id}/soft`
    );
  }

  insert(dto: ICreateLoja) {
    return this.http.post<ILoja>(environment.apiUrl + 'loja', dto, {});
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
