import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ILoja } from '../interfaces/loja.interface';
import { LojaService } from '../loja.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-listar-loja',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './listar-loja.component.html',
  styleUrl: './listar-loja.component.css',
})
export class ListarLojaComponent implements OnInit {
  protected lojas: ILoja[] = [];
  protected columnsToDisplay = ['nome', 'apelido', 'tipo', 'actions'];

  constructor(private lojaService: LojaService) {}

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

  async removerLoja(row: ILoja) {
    await lastValueFrom(this.lojaService.softDelete(row.id))
      .then(async () => {
        this.lojas = (await lastValueFrom(this.lojaService.list())).dados;
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }
}
