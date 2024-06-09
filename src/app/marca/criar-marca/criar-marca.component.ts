import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarcaService } from '../marca.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-criar-marca',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './criar-marca.component.html',
  styleUrl: './criar-marca.component.css',
})
export class CriarMarcaComponent {
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(20),
  ]);
  protected descricaoForm = new FormControl('');
  protected erroNomeMsg = '';

  constructor(private marcaService: MarcaService) {}

  async salvar() {
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;
    const descricao = this.descricaoForm.value || null;

    if (!nome) {
      throw Error('Campo "nome" inválido');
    }

    return await lastValueFrom(
      this.marcaService.insertMarca({ nome, descricao })
    )
      .then((resp) => resp)
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  checkNomeForm() {
    this.erroNomeMsg = this.marcaService.checkNomeForm(this.nomeForm);
  }

  isSalvarDissable(): boolean {
    return this.nomeForm.invalid || this.descricaoForm.invalid;
  }
}
