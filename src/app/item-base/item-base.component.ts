import { Component } from '@angular/core';
import { ItemBaseService } from './item-base.service';
import { CommonModule } from '@angular/common';
import { IItemBase } from './interfaces/item-base.interface';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-item-base',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './item-base.component.html',
  styleUrls: ['./item-base.component.css', '../../styles.css'],
})
export class ItemBaseComponent {
  protected itens: IItemBase[] = [];
  protected columnsToDisplay = ['nome', 'tipo', 'actions'];
  constructor(private itemBaseService: ItemBaseService) {
    this.init();
  }

  init() {
    this.itemBaseService.listItensBase().subscribe((resp) => {
      this.itens = resp;
    });
  }

  async desativaItem(item: IItemBase) {
    await lastValueFrom(this.itemBaseService.softDelete(item.id))
      .then(async () => {
        this.itens = await lastValueFrom(this.itemBaseService.listItensBase());
      })
      .catch((erro) => {
        alert(erro.error.message);
      });
  }

  teste(x: any) {
    console.log(x);
  }
}
