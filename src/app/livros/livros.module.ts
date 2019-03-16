import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { LivrosRoutingModule } from './livros-routing.module';
import { LivrosPesquisaComponent } from './livros-pesquisa/livros-pesquisa.component';
import { LivrosCadastroComponent } from './livros-cadastro/livros-cadastro.component';

@NgModule({
  declarations: [
    LivrosPesquisaComponent,
    LivrosCadastroComponent
  ],
  exports: [
    LivrosPesquisaComponent,
    LivrosCadastroComponent,
  ],
  imports: [
    CommonModule,
    LivrosRoutingModule,

    PanelModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    CurrencyMaskModule
  ]
})
export class LivrosModule { }
