import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ICompraRowPaginado } from './interfaces/compra-row-paginado.interface';
import { FormControl } from '@angular/forms';
import { ICreatePagamento } from './interfaces/create-pagamento.interface';
import { IMessageResp } from '../common/res/message-resp.interface';
import { ICompra } from './interfaces/compra.interface';
import { IFormaPagamento } from './interfaces/forma-pagamento.interface';
import { ICreateItem } from './interfaces/create-item.interface';
import { ICreateCompra } from './interfaces/create-compra.interface';
import { ICompraRow } from './interfaces/compra-row.interface';

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

  addItem(dto: ICreateItem) {
    return this.http.post<IMessageResp>(
      environment.apiUrl + 'control-compra/add-item-compra',
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

  softDelete(compraId: number) {
    return this.http.delete(environment.apiUrl + `compra/${compraId}/soft`, {});
  }

  insert(dto: ICreateCompra) {
    return this.http.post<ICompraRow>(environment.apiUrl + 'compra', dto, {});
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

  checkProdSelectedForm(f: FormControl<string | null>): string {
    if (f.hasError('required')) {
      return 'Deve escolher o produto';
    }
    return '';
  }

  checkQuantidadeForm(f: FormControl<number | null>): string {
    if (f.hasError('required')) {
      return 'Deve informar a quantidade de produto';
    }
    return '';
  }

  checkPrecoUnidForm(f: FormControl<number | null>): string {
    if (f.hasError('required')) {
      return 'Deve informar o valor do preço da unidade';
    }
    return '';
  }

  checkGramaturaForm(f: FormControl<string | null>): string {
    if (f.hasError('required')) {
      return 'Deve informar a gramatura do item';
    }
    return '';
  }

  checkLojaSelectForm(f: FormControl<string | null>): string {
    if (f.hasError('required')) {
      return 'Deve selecionar a loja';
    }
    return '';
  }

  checkDataForm(f: FormControl<Date | null>): string {
    if (f.hasError('required')) {
      return 'Deve informar o dia da compra';
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
