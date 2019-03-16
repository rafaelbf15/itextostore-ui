import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';

import { AutoresRoutingModule } from './autores-routing.module';
import { AutoresPesquisaComponent } from './autores-pesquisa/autores-pesquisa.component';

@NgModule({
  declarations: [AutoresPesquisaComponent],
  imports: [
    CommonModule,
    AutoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,

    PanelModule,
    ButtonModule
  ]
})
export class AutoresModule { }
