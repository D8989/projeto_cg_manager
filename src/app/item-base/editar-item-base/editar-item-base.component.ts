import { Component, Input, OnInit } from '@angular/core';
import { IItemBase } from '../interfaces/item-base.interface';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemBaseService } from '../item-base.service';
import { lastValueFrom } from 'rxjs';
import { ITipoItemBase } from '../../tipo-item-base/interfaces/tipo-item-base.interface';
import { TipoItemBaseService } from '../../tipo-item-base/tipo-item-base.service';

@Component({
  selector: 'app-editar-item-base',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './editar-item-base.component.html',
  styleUrl: './editar-item-base.component.css',
})
export class EditarItemBaseComponent implements OnInit {
  protected item: IItemBase = {
    id: 0,
    nome: 'Desconhecido',
    descricao: '-',
    tipoItemBase: {
      id: 0,
      nome: 'Desconhecido',
      descricao: '-',
    },
  };
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  protected descricaoForm = new FormControl('');
  protected tipoSelectForm = new FormControl('', [Validators.required]);

  protected erroNomeMsg = '';
  protected erroTipoSelectMsg = '';
  protected tipos: ITipoItemBase[] = [];
  constructor(
    private itemBaseService: ItemBaseService,
    private tipoItemBaseService: TipoItemBaseService
  ) {}

  @Input()
  set id(itemId: string) {
    this.itemBaseService.getItem(parseInt(itemId)).subscribe({
      next: (resp) => {
        this.item = resp;
        this.setForms();
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  ngOnInit() {
    this.tipoItemBaseService.listTipos().subscribe({
      next: (resp) => {
        this.tipos = resp;
        this.setForms();
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  async editar() {
    const id = this.item.id;
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;
    const descricao = this.descricaoForm.value?.trim() || null;
    const tipoId = this.tipoSelectForm.value
      ? parseInt(this.tipoSelectForm.value)
      : null;

    if (!nome) {
      throw Error('Campo "nome" inválido');
    }

    if (!tipoId || Number.isNaN(tipoId)) {
      throw Error('Campo "tipo" inválido');
    }

    return await lastValueFrom(
      this.itemBaseService.editar(id, {
        nome,
        descricao,
        tipoItemBaseId: tipoId,
      })
    )
      .then((resp) => {
        this.item = resp;
        this.setForms();
      })
      .catch((erro) => {
        console.log('TESTE!: ', erro);

        alert(erro.error.message);
      });
  }

  checkNomeForm() {
    this.erroNomeMsg = this.itemBaseService.checkNomeForm(this.nomeForm);
  }

  checkTipoSelectForm() {
    this.erroTipoSelectMsg = this.itemBaseService.checkSelectForm(
      this.tipoSelectForm
    );
  }

  isEditarDissable(): boolean {
    return (
      this.nomeForm.invalid ||
      this.descricaoForm.invalid ||
      this.tipoSelectForm.invalid
    );
  }

  private setForms() {
    this.nomeForm.setValue(this.item.nome);
    this.descricaoForm.setValue(this.item.descricao);
    this.tipoSelectForm.setValue(this.item.tipoItemBase.id.toString());
  }
}
