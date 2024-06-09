import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TipoItemBaseService } from '../tipo-item-base.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-criar-tipo-item-base',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './criar-tipo-item-base.component.html',
  styleUrl: './criar-tipo-item-base.component.css',
})
export class CriarTipoItemBaseComponent {
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(20),
  ]);
  protected descricaoForm = new FormControl('');
  protected erroNomeMsg = '';
  constructor(private tipoItemBaseService: TipoItemBaseService) {}

  async salvar() {
    const nome = this.nomeForm.value;
    const descricao = this.descricaoForm.value || null;

    if (!nome) {
      throw Error('Campo "nome" inválido');
    }

    return await lastValueFrom(
      this.tipoItemBaseService.insertTipo({ nome, descricao })
    )
      .then((resp) => resp)
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  checkNomeForm() {
    this.erroNomeMsg = this.tipoItemBaseService.checkNomeForm(this.nomeForm);
  }

  isSalvarDissable(): boolean {
    return this.nomeForm.invalid || this.descricaoForm.invalid;
  }
}
