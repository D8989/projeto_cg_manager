import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ITipoItemBase } from './interfaces/tipo-item-base.interface';
import { TipoItemBaseService } from './tipo-item-base.service';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-tipo-item-base',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './tipo-item-base.component.html',
  styleUrl: './tipo-item-base.component.css',
})
export class TipoItemBaseComponent {
  protected tipos: ITipoItemBase[] = [];
  protected columnsToDisplay = ['nome', 'descricao', 'actions'];
  constructor(private tipoItemBaseService: TipoItemBaseService) {
    this.init();
  }

  init() {
    this.tipoItemBaseService.listTipos().subscribe((resp) => {
      this.tipos = resp;
    });
  }

  async deleteTipo(tipo: ITipoItemBase) {
    await lastValueFrom(this.tipoItemBaseService.deleteTipo(tipo.id))
      .then(async () => {
        this.tipos = await lastValueFrom(this.tipoItemBaseService.listTipos());
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  teste(x: any) {
    console.log(x);
  }
}
