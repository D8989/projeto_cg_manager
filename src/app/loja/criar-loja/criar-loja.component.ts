import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ITipoLoja } from '../../tipo-loja/interfaces/tipo-loja.interface';
import { LojaService } from '../loja.service';
import { TipoLojaService } from '../../tipo-loja/tipo-loja.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-criar-loja',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './criar-loja.component.html',
  styleUrl: './criar-loja.component.css',
})
export class CriarLojaComponent {
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  protected apelidoForm = new FormControl('', [Validators.required]);
  protected tipoSelectForm = new FormControl('', [Validators.required]);

  protected erroNomeMsg = '';
  protected erroTipoSelectMsg = '';
  protected tipos: ITipoLoja[];
  constructor(
    private lojaService: LojaService,
    private tipoLojaService: TipoLojaService
  ) {
    this.tipos = [];
    this.loadTipos();
  }

  async loadTipos() {
    this.tipos = (
      await lastValueFrom(this.tipoLojaService.listPaginado())
    ).dados;
  }

  async salvar() {
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;
    const apelido = this.apelidoForm.value;
    const tipoId = this.tipoSelectForm.value
      ? parseInt(this.tipoSelectForm.value)
      : null;

    if (!nome) {
      alert('Nome está com valor inválido');
      return;
    }

    if (!apelido) {
      alert('Apelido está com valor inválido');
      return;
    }

    if (!tipoId || Number.isNaN(tipoId)) {
      alert('Tipo escolhido está com valor inválido');
      return;
    }

    await lastValueFrom(
      this.lojaService.insert({
        nome: nome,
        apelido: apelido,
        tipoLojaId: tipoId,
        enderecoDto: {
          rua: 'rua A',
          cidade: 'Rio de Janeiro',
        },
      })
    )
      .then((resp) => resp)
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  checkNomeForm() {
    this.erroNomeMsg = this.lojaService.checkNomeForm(this.nomeForm);
  }

  checkTipoSelectForm() {
    this.erroTipoSelectMsg = this.lojaService.checkSelectForm(
      this.tipoSelectForm
    );
  }

  isSalvarDissable(): boolean {
    return (
      this.nomeForm.invalid ||
      this.apelidoForm.invalid ||
      this.tipoSelectForm.invalid
    );
  }
}
