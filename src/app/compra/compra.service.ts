import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICompraRowPaginado } from './interfaces/compra-row-paginado.interface';
import { FormControl } from '@angular/forms';

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

  checkValorForm(vForm: FormControl<number | null>): string {
    if (vForm.hasError('required')) {
      return 'O nome é obrigatório';
    }
    return '';
  }
}
