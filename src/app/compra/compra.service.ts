import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICompraRowPaginado } from './interfaces/compra-row-paginado.interface';
import { FormControl } from '@angular/forms';
import { ICreatePagamento } from './interfaces/create-pagamento.interface';
import { IMessageResp } from '../common/res/message-resp.interface';
import { ICompra } from './interfaces/compra.interface';
import { IFormaPagamento } from './interfaces/forma-pagamento.interface';

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

  addPagamento(dto: ICreatePagamento) {
    return this.http.post<IMessageResp>(
      environment.apiUrl + 'control-compra/add-pagamento',
      dto,
      {}
    );
  }

  getCompra(compraId: number) {
    return this.http.get<ICompra>(
      environment.apiUrl + `compra/${compraId}`,
      {}
    );
  }

  removerItem(compraId: number, itemId: number) {
    return this.http.delete<IMessageResp>(
      environment.apiUrl +
        `control-compra/compra/${compraId}/item-compra/${itemId}`,
      {}
    );
  }

  removerPagamento(compraId: number, pagId: number) {
    return this.http.delete<IMessageResp>(
      environment.apiUrl +
        `control-compra/compra/${compraId}/pagamento/${pagId}`,
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

  checkPagSelectedForm(f: FormControl<string | null>): string {
    if (f.hasError('required')) {
      return 'Deve escolher a forma de pagamento';
    }
    return '';
  }

  getFormasPagamento(): IFormaPagamento[] {
    return [
      { value: 'DINHEIRO', viewValue: 'dinheiro' },
      { value: 'CREDITO', viewValue: 'crédito' },
      { value: 'DEBITO', viewValue: 'debito' },
    ];
  }
}
