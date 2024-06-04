import { Component } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ITipoItemBase } from './interfaces/tipo-item-base.interface';
import { TipoItemBaseService } from './tipo-item-base.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tipo-item-base',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './tipo-item-base.component.html',
  styleUrl: './tipo-item-base.component.css',
})
export class TipoItemBaseComponent {
  protected tipos: ITipoItemBase[] = [];
  protected columnsToDisplay = ['nome', 'descricao'];
  constructor(private tipoItemBaseService: TipoItemBaseService) {
    this.init();
  }

  init() {
    this.tipoItemBaseService.listTipos().subscribe((resp) => {
      this.tipos = resp;
    });
  }
}
