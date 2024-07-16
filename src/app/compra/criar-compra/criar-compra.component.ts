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
import { provideNativeDateAdapter } from '@angular/material/core';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-criar-compra',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './criar-compra.component.html',
  styleUrl: './criar-compra.component.css',
})
export class CriarCompraComponent {
  protected lojas: any[] = [
    { id: 1, nome: 'loja 1' },
    { id: 2, nome: 'loja 2' },
  ];

  protected lojaSelectForm = new FormControl('', [Validators.required]);
  protected erroLojaSeletFormMsg = '';

  protected dataForm = new FormControl(new Date(), [Validators.required]);
  protected erroDataFormMsg = '';

  constructor(private compraService: CompraService) {}

  async salvar() {
    console.log(this.dataForm.value?.toISOString());

    return;
  }

  isSalvarDissable() {
    return this.lojaSelectForm.invalid || this.dataForm.invalid;
  }

  checkLojaSelectedForm() {
    return this.compraService.checkLojaSelectForm(this.lojaSelectForm);
  }

  checkDataForm() {
    return this.compraService.checkDataForm(this.dataForm);
  }
}
