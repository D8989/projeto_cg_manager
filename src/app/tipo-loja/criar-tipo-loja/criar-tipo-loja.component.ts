import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TipoLojaService } from '../tipo-loja.service';

@Component({
  selector: 'app-criar-tipo-loja',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './criar-tipo-loja.component.html',
  styleUrl: './criar-tipo-loja.component.css',
})
export class CriarTipoLojaComponent implements OnInit {
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(20),
  ]);
  protected descricaoForm = new FormControl('');
  protected erroNomeMsg = '';
  constructor(private tipoLojaService: TipoLojaService) {}

  ngOnInit(): void {}

  async salvar() {
    const nome = this.nomeForm.value;
    const descricao = this.descricaoForm.value || null;

    if (!nome) {
      throw Error('Campo "nome" inválido');
    }

    return await lastValueFrom(this.tipoLojaService.insert({ nome, descricao }))
      .then((resp) => resp)
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  checkNomeForm() {
    this.erroNomeMsg = this.tipoLojaService.checkNomeForm(this.nomeForm);
  }

  isSalvarDissable(): boolean {
    return this.nomeForm.invalid || this.descricaoForm.invalid;
  }
}
