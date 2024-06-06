import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ITipoItemBase } from '../interfaces/tipo-item-base.interface';
import { TipoItemBaseService } from '../tipo-item-base.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar-tipo-item-base',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './editar-tipo-item-base.component.html',
  styleUrl: './editar-tipo-item-base.component.css',
})
export class EditarTipoItemBaseComponent {
  protected erroNomeMsg: string = '';
  protected tipo: ITipoItemBase = {
    id: 0,
    nome: 'Desconhecido',
    descricao: '-',
  };
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(20),
  ]);
  protected descricaoForm = new FormControl('');
  constructor(private tipoItemBaseService: TipoItemBaseService) {}

  @Input()
  set id(tipoId: string) {
    this.tipoItemBaseService.getTipo(parseInt(tipoId)).subscribe({
      next: (resp) => {
        this.tipo = resp;
        this.setForms();
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  async editar() {
    const id = this.tipo.id;
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;
    const descricao = this.descricaoForm.value?.trim() || null;

    if (!nome) {
      throw Error('Campo "nome" inválido');
    }

    return await lastValueFrom(
      this.tipoItemBaseService.editarTipo(id, { nome, descricao })
    )
      .then((resp) => {
        this.tipo = resp;
        this.setForms();
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  checkNomeForm() {
    this.erroNomeMsg = this.tipoItemBaseService.checkNomeForm(this.nomeForm);
  }

  isEditarDissable(): boolean {
    return this.nomeForm.invalid || this.descricaoForm.invalid;
  }

  private setForms() {
    this.nomeForm.setValue(this.tipo.nome);
    this.descricaoForm.setValue(this.tipo.descricao);
  }
}
