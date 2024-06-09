import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { MarcaService } from '../marca.service';
import { IMarca } from '../interfaces/marca.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-listar-marca',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './listar-marca.component.html',
  styleUrl: './listar-marca.component.css',
})
export class ListarMarcaComponent implements OnInit {
  protected marcas: IMarca[] = [];
  protected columnsToDisplay = ['nome', 'descricao', 'actions'];
  constructor(private marcaService: MarcaService) {}

  ngOnInit(): void {
    this.marcaService.list().subscribe({
      next: (resp) => {
        this.marcas = resp.dados;
      },
      error: (erro) => {
        alert(erro.error.message);
      },
    });
  }

  async deleteMarca(marca: IMarca) {
    await lastValueFrom(this.marcaService.softDelete(marca.id))
      .then(async (resp) => {
        this.marcas = (await lastValueFrom(this.marcaService.list())).dados;
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }
}
