import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ICompraRow } from '../interfaces/compra-row.interface';
import { CompraService } from '../compra.service';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AddPagamentoDialogComponent } from '../add-pagamento-dialog/add-pagamento-dialog.component';

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
  protected dialog = inject(MatDialog);

  constructor(private compraService: CompraService) {}

  ngOnInit(): void {
    this.compraService.list().subscribe({
      next: (resp) => {
        console.log('RESP: ', resp);

        this.compras = resp.dados;
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });

    console.log(this.compras);
  }

  openPagamentoDialog() {
    const dialogRef = this.dialog.open(AddPagamentoDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('DIALOG FECHADO');
      console.log(result);
    });
  }
}
