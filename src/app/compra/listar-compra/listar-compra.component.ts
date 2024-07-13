import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ICompraRow } from '../interfaces/compra-row.interface';
import { CompraService } from '../compra.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AddPagamentoDialogComponent } from '../add-pagamento-dialog/add-pagamento-dialog.component';
import { DialogMessageComponent } from '../../common/dialog/dialog-message/dialog-message.component';

@Component({
  selector: 'app-listar-compra',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './listar-compra.component.html',
  styleUrl: './listar-compra.component.css',
})
export class ListarCompraComponent implements OnInit {
  protected compras: ICompraRow[] = [];
  protected columnsToDisplay = [
    'codigo',
    'dataCompra',
    'lojaNome',
    'valorTotal',
    'actions',
  ];
  private dialog = inject(MatDialog);

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    this.compraService.list().subscribe({
      next: (resp) => {
        this.compras = resp.dados;
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  openPagamentoDialog(row: ICompraRow) {
    const dialogRef = this.dialog.open(AddPagamentoDialogComponent, {
      data: { compraId: row.id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.message) {
        this.dialog.open(DialogMessageComponent, { data: result });
      }
    });
  }
}
