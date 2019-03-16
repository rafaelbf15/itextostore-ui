import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: 'livros',
    loadChildren: './livros/livros.module#LivrosModule'
  },
  {
    path: 'estante',
    loadChildren: './livros/livros.module#LivrosModule'
  },
  {
    path: 'autores',
    loadChildren: './autores/autores.module#AutoresModule'
  },
  {
    path: '',
    redirectTo: 'livros',
    pathMatch: 'full'
  },
  {
    path: 'pagina-nao-encontrada',
    component: PaginaNaoEncontradaComponent
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
