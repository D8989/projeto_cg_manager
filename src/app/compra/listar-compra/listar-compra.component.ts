import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ICompraRow } from '../interfaces/compra-row.interface';
import { CompraService } from '../compra.service';
import { lastValueFrom } from 'rxjs';

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

  async removerCompra(compra: ICompraRow) {
    lastValueFrom(this.compraService.softDelete(compra.id))
      .then(async () => {
        this.compras = (await lastValueFrom(this.compraService.list())).dados;
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }
}
