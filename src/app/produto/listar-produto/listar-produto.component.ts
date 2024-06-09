import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { IProduto } from '../interfaces/produto.interface';
import { ProdutoService } from '../produto.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-listar-produto',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './listar-produto.component.html',
  styleUrl: './listar-produto.component.css',
})
export class ListarProdutoComponent implements OnInit {
  protected produtos: IProduto[] = [];
  protected columnsToDisplay = [
    'nome',
    'marca',
    'quantidade',
    'item-base',
    'actions',
  ];

  constructor(private produtoService: ProdutoService) {}

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

  async desativaProduto(p: IProduto) {
    await lastValueFrom(this.produtoService.softDelete(p.id))
      .then(async () => {
        this.produtos = (await lastValueFrom(this.produtoService.list())).dados;
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }
}
