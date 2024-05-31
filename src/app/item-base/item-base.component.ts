import { Component } from '@angular/core';
import { ItemBaseService } from './item-base.service';
import { CommonModule } from '@angular/common';
import { IItemBase } from './interfaces/item-base.interface';

@Component({
  selector: 'app-item-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-base.component.html',
  styleUrl: './item-base.component.css',
})
export class ItemBaseComponent {
  protected itens: IItemBase[] = [];
  constructor(private itemBaseService: ItemBaseService) {
    this.init();
  }

  init() {
    this.itemBaseService.listItensBase().subscribe((resp) => {
      this.itens = resp;
    });
  }
}
