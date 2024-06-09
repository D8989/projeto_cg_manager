import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemBaseService } from '../item-base.service';
import { CommonModule } from '@angular/common';
import { ITipoItemBase } from '../../tipo-item-base/interfaces/tipo-item-base.interface';
import { TipoItemBaseService } from '../../tipo-item-base/tipo-item-base.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-criar-item-base',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './criar-item-base.component.html',
  styleUrl: './criar-item-base.component.css',
})
export class CriarItemBaseComponent {
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  protected descricaoForm = new FormControl('');
  protected tipoSelectForm = new FormControl('', [Validators.required]);

  protected erroNomeMsg = '';
  protected erroTipoSelectMsg = '';
  protected tipos: ITipoItemBase[];
  constructor(
    private itemBaseService: ItemBaseService,
    private tipoItemBaseService: TipoItemBaseService
  ) {
    this.tipos = [];
    this.loadTipos();
  }

  async loadTipos() {
    this.tipos = await lastValueFrom(this.tipoItemBaseService.listTipos());
  }

  async salvar() {
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;
    const descricao = this.descricaoForm.value;
    const tipoId = this.tipoSelectForm.value
      ? parseInt(this.tipoSelectForm.value)
      : null;

    if (!nome) {
      alert('Nome está com valor inválido');
      return;
    }

    if (!tipoId || Number.isNaN(tipoId)) {
      alert('Tipo escolhido está com valor inválido');
      return;
    }

    await lastValueFrom(
      this.itemBaseService.salvar({
        nome: nome,
        descricao: descricao,
        tipoItemBaseId: tipoId,
      })
    )
      .then((resp) => resp)
      .catch((erro) => {
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

  isSalvarDissable(): boolean {
    return (
      this.nomeForm.invalid ||
      this.descricaoForm.invalid ||
      this.tipoSelectForm.invalid
    );
  }
}
