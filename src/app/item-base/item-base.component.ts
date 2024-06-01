import { Component } from '@angular/core';
import { ItemBaseService } from './item-base.service';
import { CommonModule } from '@angular/common';
import { IItemBase } from './interfaces/item-base.interface';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-item-base',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './item-base.component.html',
  styleUrl: './item-base.component.css',
})
export class ItemBaseComponent {
  protected itens: IItemBase[] = [];
  protected columnsToDisplay = ['nome', 'tipo'];
  constructor(private itemBaseService: ItemBaseService) {
    this.init();
  }

  init() {
    this.itemBaseService.listItensBase().subscribe((resp) => {
      this.itens = resp;
    });
  }
}
