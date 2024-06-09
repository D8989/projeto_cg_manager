import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-criar-produto',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './criar-produto.component.html',
  styleUrl: './criar-produto.component.css',
})
export class CriarProdutoComponent implements OnInit {
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  protected descricaoForm = new FormControl('');
  protected marcaSelectForm = new FormControl('', [Validators.required]);
  protected itemBaseSelectForm = new FormControl('', [Validators.required]);
  protected quantidadeForm = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(100000),
  ]);
  protected gramaturaForm = new FormControl('', [
    Validators.required,
    Validators.pattern(/g$|Kg$|l$|ml$/),
    Validators.minLength(1),
    Validators.maxLength(2),
  ]);

  protected erroNomeMsg = '';
  protected erroMarcaSelectMsg = '';
  protected erroItemBaseSelectMsg = '';
  protected erroQuantidadeMsg = '';
  protected erroGramaturaMsg = '';

  protected marcas: { id: number; nome: string }[] = [
    { id: 1, nome: 'marca 1' },
  ];
  protected itens: { id: number; nome: string }[] = [{ id: 8, nome: 'item 8' }];
  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {}

  checkNomeForm() {
    this.erroNomeMsg = this.produtoService.checkNomeForm(this.nomeForm);
  }

  checkTipoSelectForm() {
    this.erroMarcaSelectMsg = this.produtoService.checkMarcaSelectForm(
      this.marcaSelectForm
    );
  }

  checkItemBaseSelectForm() {
    this.erroItemBaseSelectMsg = this.produtoService.checkItemBaseSelectForm(
      this.itemBaseSelectForm
    );
  }

  checkQuantidadeFrom() {
    this.erroQuantidadeMsg = this.produtoService.checkQuantidadeForm(
      this.quantidadeForm
    );
  }

  checkGramaturaFrom() {
    this.erroGramaturaMsg = this.produtoService.checkGramaturaForm(
      this.gramaturaForm
    );
  }

  async salvar() {
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;
    const descricao = this.descricaoForm.value;
    const quantidade = this.quantidadeForm.value
      ? parseInt(this.quantidadeForm.value)
      : null;
    const gramatura = this.gramaturaForm.value;
    const marcaId = this.marcaSelectForm.value
      ? parseInt(this.marcaSelectForm.value)
      : null;
    const itemBaseId = this.itemBaseSelectForm.value
      ? parseInt(this.itemBaseSelectForm.value)
      : null;

    if (!nome) {
      alert('Nome está com valor inválido');
      return;
    }
    if (!quantidade) {
      alert('Quantiaded inválida');
      return;
    }
    if (!gramatura) {
      alert('Gramatura inválida');
      return;
    }
    if (!marcaId || Number.isNaN(marcaId)) {
      alert('Marca escolhida está com valor inválido');
      return;
    }
    if (!itemBaseId || Number.isNaN(itemBaseId)) {
      alert('Item-base escolhido está com valor inválido');
      return;
    }

    await lastValueFrom(
      this.produtoService.salvar({
        nome: nome,
        descricao: descricao,
        quantidade: quantidade,
        gramatura: gramatura,
        marcaId: marcaId,
        itemBaseId: itemBaseId,
      })
    )
      .then((resp) => resp)
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  isSalvarDissable() {
    return (
      this.nomeForm.invalid ||
      this.descricaoForm.invalid ||
      this.marcaSelectForm.invalid ||
      this.itemBaseSelectForm.invalid ||
      this.quantidadeForm.invalid ||
      this.gramaturaForm.invalid
    );
  }
}
