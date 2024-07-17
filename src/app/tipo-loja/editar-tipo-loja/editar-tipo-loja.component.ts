import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ITipoLoja } from '../interfaces/tipo-loja.interface';
import { TipoLojaService } from '../tipo-loja.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar-tipo-loja',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './editar-tipo-loja.component.html',
  styleUrl: './editar-tipo-loja.component.css',
})
export class EditarTipoLojaComponent {
  protected erroNomeMsg: string = '';
  protected tipo: ITipoLoja = {
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
  constructor(private tipoLojaService: TipoLojaService) {}

  @Input()
  set id(tipoId: string) {
    this.tipoLojaService.getTipo(parseInt(tipoId)).subscribe({
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
      this.tipoLojaService.update(id, { nome, descricao })
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
    this.erroNomeMsg = this.tipoLojaService.checkNomeForm(this.nomeForm);
  }

  isEditarDissable(): boolean {
    return this.nomeForm.invalid || this.descricaoForm.invalid;
  }

  private setForms() {
    this.nomeForm.setValue(this.tipo.nome);
    this.descricaoForm.setValue(this.tipo.descricao);
  }
}
