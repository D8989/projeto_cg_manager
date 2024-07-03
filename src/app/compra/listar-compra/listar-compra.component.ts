import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ICompraRow } from '../interfaces/compra-row.interface';
import { CompraService } from '../compra.service';
import { environment } from '../../../environments/environment';

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
  ];

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
}
