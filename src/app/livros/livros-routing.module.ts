import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LivrosCadastroComponent } from './livros-cadastro/livros-cadastro.component';
import { LivrosPesquisaComponent } from './livros-pesquisa/livros-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: LivrosPesquisaComponent
  },
  {
    path: ':id',
    component: LivrosCadastroComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class LivrosRoutingModule { }
