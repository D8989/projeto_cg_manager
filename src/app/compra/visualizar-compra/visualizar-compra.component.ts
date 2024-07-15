import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ICompra } from '../interfaces/compra.interface';
import { lastValueFrom } from 'rxjs';
import { CompraService } from '../compra.service';
import { ICompraItem } from '../interfaces/compra-item.interface';
import { ICompraPagamento } from '../interfaces/compra-pagamento.interface';
import { IFormaPagamento } from '../interfaces/forma-pagamento.interface';
import { AddPagamentoDialogComponent } from '../add-pagamento-dialog/add-pagamento-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../common/dialog/dialog-message/dialog-message.component';
import { AddItemDialogComponent } from '../add-item-dialog/add-item-dialog.component';

@Component({
  selector: 'app-visualizar-compra',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './visualizar-compra.component.html',
  styleUrl: './visualizar-compra.component.css',
})
export class VisualizarCompraComponent implements OnInit {
  private compraId: number = 0;
  private dialog = inject(MatDialog);
  private formasPagamentos: IFormaPagamento[] = [];
  protected compra: ICompra | null = null;
  protected itens: ICompraItem[] = [];
  protected pagamentos: ICompraPagamento[] = [];

  protected itemColumnsToDisplay = [
    'nome',
    'quantidade',
    'valor_unidade',
    'valor_total',
    'actions',
  ];
  protected pagamentoColumnsToDisplay = [
    'nome',
    'forma_pagamento',
    'valor',
    'actions',
  ];

  constructor(private compraService: CompraService) {}

  @Input()
  set id(id: string) {
    this.compraId = parseInt(id);
  }

  async ngOnInit(): Promise<void> {
    this.formasPagamentos = this.compraService.getFormasPagamento();
    await lastValueFrom(this.compraService.getCompra(this.compraId))
      .then((resp) => {
        this.compra = resp;
        this.itens = resp.itens || [];
        this.pagamentos = resp.pagamentos || [];

        this.pagamentos.forEach((p, i, self) => {
          self[i].formaPagamentoView =
            this.formasPagamentos.find((fp) => fp.value === p.formaPagamento)
              ?.viewValue || 'PAG';
        });
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  async removerItem(item: ICompraItem) {
    await lastValueFrom(this.compraService.removerItem(this.compraId, item.id))
      .then(async () => {
        await this.resetCompra();
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  async removerPagamento(pagamento: ICompraPagamento) {
    await lastValueFrom(
      this.compraService.removerPagamento(this.compraId, pagamento.id)
    )
      .then(async () => {
        await this.resetCompra();
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  openPagamentoDialog() {
    const dialogRef = this.dialog.open(AddPagamentoDialogComponent, {
      data: { compraId: this.compraId },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.resetCompra();
      if (result?.message) {
        this.dialog.open(DialogMessageComponent, { data: result });
      }
    });
  }

  openItemDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: { compraId: this.compraId },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      await this.resetCompra();
      if (result?.message) {
        this.dialog.open(DialogMessageComponent, { data: result });
      }
    });
  }

  private async resetCompra() {
    this.compra = await lastValueFrom(
      this.compraService.getCompra(this.compraId)
    );

    this.itens = this.compra.itens;
    this.pagamentos = this.compra.pagamentos;

    this.pagamentos.forEach((p, i, self) => {
      self[i].formaPagamentoView =
        this.formasPagamentos.find((fp) => fp.value === p.formaPagamento)
          ?.viewValue || 'PAG';
    });
  }
}
