import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AutoresPesquisaComponent } from './autores-pesquisa/autores-pesquisa.component';

const routes: Routes = [
  {
    path: '',
    component: AutoresPesquisaComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AutoresRoutingModule { }
