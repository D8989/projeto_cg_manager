import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { CompraService } from '../compra.service';
import { ILoja } from '../../loja/interfaces/loja.interface';
import { LojaService } from '../../loja/loja.service';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../common/dialog/dialog-message/dialog-message.component';

@Component({
  selector: 'app-criar-compra',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
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
export class CriarCompraComponent implements OnInit {
  private dialog = inject(MatDialog);
  protected lojas: ILoja[] = [];

  protected lojaSelectForm = new FormControl('', [Validators.required]);
  protected erroLojaSeletFormMsg = '';

  protected dataForm = new FormControl(new Date(), [Validators.required]);
  protected erroDataFormMsg = '';

  constructor(
    private compraService: CompraService,
    private lojaService: LojaService
  ) {}

  ngOnInit(): void {
    this.lojaService.list().subscribe({
      next: (resp) => {
        this.lojas = resp.dados;
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  async salvar() {
    const dataStr = this.dataForm.value?.toISOString();
    if (!dataStr) {
      alert('Valor da data inválido');
      return;
    }

    const lIdStr = this.lojaSelectForm.value;
    if (!lIdStr) {
      alert('Valor do identificador da loja inválido');
      return;
    }

    await lastValueFrom(
      this.compraService.insert({
        dataCompraStr: dataStr,
        lojaId: parseInt(lIdStr),
      })
    ).then((resp) => {
      if (resp) {
        this.dialog.open(DialogMessageComponent, {
          data: { id: resp.id, message: 'Compra adicionada com sucesso!' },
        });
      }
    });

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
