import { Component, Input, OnInit } from '@angular/core';
import { MarcaService } from '../marca.service';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IMarca } from '../interfaces/marca.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar-marca',
  standalone: true,
  imports: [MaterialModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './editar-marca.component.html',
  styleUrl: './editar-marca.component.css',
})
export class EditarMarcaComponent implements OnInit {
  protected marca: IMarca;
  protected nomeForm = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(50),
  ]);
  protected descricaoForm = new FormControl('');
  protected erroNomeMsg: string = '';
  constructor(private marcaService: MarcaService) {
    this.marca = { id: 0, nome: 'Desconhecido', descricao: '-' };
  }

  @Input()
  set id(tipoId: string) {
    this.marcaService.getMarca(parseInt(tipoId)).subscribe({
      next: (resp) => {
        this.marca = resp;
        this.setForms();
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  ngOnInit(): void {}

  checkNomeForm() {
    this.erroNomeMsg = this.marcaService.checkNomeForm(this.nomeForm);
  }

  async editar() {
    const nome = this.nomeForm.value ? this.nomeForm.value.trim() : null;
    const descricao = this.descricaoForm.value
      ? this.descricaoForm.value.trim()
      : null;

    if (!nome) {
      alert('Nome está com valor inválido');
      return;
    }

    await lastValueFrom(
      this.marcaService.editMarca(this.marca.id, { nome, descricao })
    );
  }

  isEditarDissable() {
    return this.nomeForm.invalid || this.descricaoForm.invalid || true;
  }

  private setForms() {
    this.nomeForm.setValue(this.marca.nome);
    this.descricaoForm.setValue(this.marca.descricao);
  }
}
