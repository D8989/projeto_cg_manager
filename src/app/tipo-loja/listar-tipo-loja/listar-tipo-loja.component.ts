import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ITipoLoja } from '../interfaces/tipo-loja.interface';
import { TipoLojaService } from '../tipo-loja.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-listar-tipo-loja',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './listar-tipo-loja.component.html',
  styleUrl: './listar-tipo-loja.component.css',
})
export class ListarTipoLojaComponent implements OnInit {
  protected tipos: ITipoLoja[] = [];
  protected columnsToDisplay = ['nome', 'descricao', 'actions'];

  constructor(private tipoLojaService: TipoLojaService) {}

  ngOnInit(): void {
    this.tipoLojaService.listPaginado().subscribe({
      next: (resp) => {
        this.tipos = resp.dados;
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  async deactivateTipoLoja(tipo: ITipoLoja) {
    await lastValueFrom(this.tipoLojaService.softDelete(tipo.id))
      .then(async () => {
        this.tipos = (
          await lastValueFrom(this.tipoLojaService.listPaginado())
        ).dados;
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }
}
