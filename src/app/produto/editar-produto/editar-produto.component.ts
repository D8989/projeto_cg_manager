import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IMarca } from '../../marca/interfaces/marca.interface';
import { IItemBase } from '../../item-base/interfaces/item-base.interface';
import { ProdutoService } from '../produto.service';
import { ItemBaseService } from '../../item-base/item-base.service';
import { MarcaService } from '../../marca/marca.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { IProduto } from '../interfaces/produto.interface';

@Component({
  selector: 'app-editar-produto',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.css',
})
export class EditarProdutoComponent implements OnInit {
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

  protected produto: IProduto;
  protected marcas: IMarca[] = [];
  protected itens: IItemBase[] = [];
  constructor(
    private produtoService: ProdutoService,
    private itemBaseService: ItemBaseService,
    private marcaService: MarcaService
  ) {
    this.produto = {
      id: 0,
      nome: 'Desconhecido',
      descricao: '-',
      quantidade: 0,
      gramatura: '-',
      itemBase: {
        id: 0,
        nome: 'Item Desconhecido',
        descricao: '-',
        tipoItemBase: { id: 0, nome: 'Tipo Desconhecido' },
      },
      marca: { id: 0, nome: 'Marca Desconhecida', descricao: '-' },
    };
  }

  @Input()
  set id(prodId: string) {
    this.produtoService.getProduto(parseInt(prodId)).subscribe({
      next: (resp) => {
        this.produto = resp;
        this.setForms();
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  ngOnInit(): void {
    forkJoin([
      this.itemBaseService.listItensBase(),
      this.marcaService.list(),
    ]).subscribe({
      next: (resp) => {
        this.itens = resp[0];
        this.marcas = resp[1].dados;
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

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

  async editar() {
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;

    const descricao = this.descricaoForm.value
      ? this.descricaoForm.value.trim()
      : null;

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
      this.produtoService.editar(this.produto.id, {
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

  compareMarca(m1Id: any, m2Id: any) {
    return m1Id == m2Id;
  }

  compareItemBase(ib1Id: any, ib2Id: any) {
    return ib1Id == ib2Id;
  }

  private setForms() {
    this.nomeForm.setValue(this.produto.nome);
    this.descricaoForm.setValue(this.produto.descricao);
    this.quantidadeForm.setValue(this.produto.quantidade.toString());
    this.gramaturaForm.setValue(this.produto.gramatura);
    this.itemBaseSelectForm.setValue(this.produto.itemBase.id.toString());
    this.marcaSelectForm.setValue(this.produto.marca.id.toString());
  }
}
