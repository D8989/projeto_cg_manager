import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ItemBaseComponent } from './item-base/item-base.component';
import { TipoItemBaseComponent } from './tipo-item-base/tipo-item-base.component';
import { CriarTipoItemBaseComponent } from './tipo-item-base/criar-tipo-item-base/criar-tipo-item-base.component';
import { EditarTipoItemBaseComponent } from './tipo-item-base/editar-tipo-item-base/editar-tipo-item-base.component';
import { CriarItemBaseComponent } from './item-base/criar-item-base/criar-item-base.component';
import { EditarItemBaseComponent } from './item-base/editar-item-base/editar-item-base.component';
import { ListarProdutoComponent } from './produto/listar-produto/listar-produto.component';
import { CriarProdutoComponent } from './produto/criar-produto/criar-produto.component';
import { ListarMarcaComponent } from './marca/listar-marca/listar-marca.component';

export const routes: Routes = [
  {
    path: 'home',
    component: PaginaInicialComponent,
    title: 'Página inicial',
  },
  {
    path: 'item-base',
    component: ItemBaseComponent,
    title: 'Itém base',
  },
  {
    path: 'item-base/criacao',
    component: CriarItemBaseComponent,
    title: 'Create Item base',
  },
  {
    path: 'item-base/:id/edicao',
    component: EditarItemBaseComponent,
    title: 'Edit Item base',
  },
  {
    path: 'tipo-item-base',
    component: TipoItemBaseComponent,
    title: 'Tipo Item-base',
  },
  {
    path: 'tipo-item-base/criacao',
    component: CriarTipoItemBaseComponent,
    title: 'create tipo-item-base',
  },
  {
    path: 'tipo-item-base/:id/edicao',
    component: EditarTipoItemBaseComponent,
    title: 'edit tipo-item-base',
  },
  {
    path: 'produto',
    component: ListarProdutoComponent,
    title: 'Produtos',
  },
  {
    path: 'produto/criacao',
    component: CriarProdutoComponent,
    title: 'Create produto',
  },
  {
    path: 'marca',
    component: ListarMarcaComponent,
    title: 'Marca',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
