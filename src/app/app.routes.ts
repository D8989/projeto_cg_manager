import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ItemBaseComponent } from './item-base/item-base.component';
import { TipoItemBaseComponent } from './tipo-item-base/tipo-item-base.component';

export const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent,
    title: 'Página inicial',
  },
  {
    path: 'item-base',
    component: ItemBaseComponent,
    title: 'Itém base',
  },
  {
    path: 'tipo-item-base',
    component: TipoItemBaseComponent,
    title: 'Tipo Item-base',
  },
];
