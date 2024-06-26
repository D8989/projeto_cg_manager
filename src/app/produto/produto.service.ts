import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduto } from './interfaces/produto.interface';
import { IProdutoPaginado } from './interfaces/produto-paginado.interface';
import { FormControl } from '@angular/forms';
import { ICreateProduto } from './interfaces/create-produto.interface';
import { IEditProduto } from './interfaces/edit-produto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.post<IProdutoPaginado>(
      'http://localhost:3000/produto/list',
      {}
    );
  }

  softDelete(id: number) {
    return this.http.delete(
      'http://localhost:3000/produto/ID/soft-delete'.replace(
        'ID',
        id.toString()
      )
    );
  }

  salvar(dto: ICreateProduto) {
    return this.http.post('http://localhost:3000/produto', dto);
  }

  editar(id: number, dto: IEditProduto) {
    return this.http.put(
      'http://localhost:3000/produto/ID'.replace('ID', id.toString()),
      dto
    );
  }

  getProduto(id: number) {
    return this.http.get<IProduto>(
      'http://localhost:3000/produto/ID'.replace('ID', id.toString())
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

  checkMarcaSelectForm(nomeForm: FormControl<string | null>): string {
    if (nomeForm.hasError('required')) {
      return 'A marca é obrigatória';
    }
    return '';
  }

  checkItemBaseSelectForm(nomeForm: FormControl<string | null>): string {
    if (nomeForm.hasError('required')) {
      return 'O item-base é obrigatório';
    }
    return '';
  }

  checkQuantidadeForm(nomeForm: FormControl<string | null>): string {
    if (nomeForm.hasError('required')) {
      return 'A quantidade é obrigatória';
    }
    if (nomeForm.hasError('min')) {
      return 'O valor da quantidade deve ser maior que 1';
    }
    if (nomeForm.hasError('max')) {
      return 'O valor da quantidade deve ser menor que 100000';
    }
    return '';
  }

  checkGramaturaForm(nomeForm: FormControl<string | null>): string {
    if (nomeForm.hasError('required')) {
      return 'A gramatura é obrigatória';
    }
    if (
      nomeForm.hasError('pattern') ||
      nomeForm.hasError('minLength') ||
      nomeForm.hasError('maxLength')
    ) {
      return 'O valor da gramatura de ser uma das opções: "g", "Kg", "m" ou "ml"';
    }
    return '';
  }
}
