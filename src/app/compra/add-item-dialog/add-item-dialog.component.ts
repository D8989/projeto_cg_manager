import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAddItemDialogData } from '../interfaces/add-item-dialog-data.interface';
import { CompraService } from '../compra.service';
import { ProdutoService } from '../../produto/produto.service';
import { IProduto } from '../../produto/interfaces/produto.interface';
import { IMessageResp } from '../../common/res/message-resp.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-item-dialog.component.html',
  styleUrl: './add-item-dialog.component.css',
})
export class AddItemDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AddItemDialogComponent>);
  private readonly data = inject<IAddItemDialogData>(MAT_DIALOG_DATA);
  protected produtos: IProduto[] = [];

  protected produtoSelectForm = new FormControl('', [Validators.required]);
  protected erroProdSelectMsg = '';

  protected quantidadeForm = new FormControl(1, [Validators.required]);
  protected erroQuantidadeMsg = '';

  protected precoUnidadeForm = new FormControl(0.01, [Validators.required]);
  protected erroPrecoUnidadeMsg = '';

  protected gramaturaForm = new FormControl('', [Validators.required]);
  protected erroGramaturaMsg = '';

  constructor(
    private compraService: CompraService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.produtoService.list().subscribe({
      next: (resp) => {
        this.produtos = resp.dados;
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSaveClick() {
    const respMessage: IMessageResp = { message: '' };

    await lastValueFrom(
      this.compraService.addItem({
        compraId: this.data.compraId,
        produtoId: parseInt(this.produtoSelectForm.value!),
        precoUnidade: this.precoUnidadeForm.value!,
        quantidade: this.quantidadeForm.value!,
        gramatura: this.gramaturaForm.value!,
      })
    )
      .then((resp) => {
        respMessage.id = resp.id;
        respMessage.message = resp.message;
      })
      .catch((erro) => {
        alert(erro.error.message);
      });

    this.dialogRef.close(respMessage);
  }

  checkProdutoSelectForm() {
    this.erroProdSelectMsg = this.compraService.checkProdSelectedForm(
      this.produtoSelectForm
    );
  }

  checkQtdForm() {
    this.erroQuantidadeMsg = this.compraService.checkQuantidadeForm(
      this.quantidadeForm
    );
  }

  checkPrecoUnidForm() {
    this.erroPrecoUnidadeMsg = this.compraService.checkPrecoUnidForm(
      this.precoUnidadeForm
    );
  }

  checkGramaturaForm() {
    this.erroGramaturaMsg = this.compraService.checkGramaturaForm(
      this.gramaturaForm
    );
  }
}
