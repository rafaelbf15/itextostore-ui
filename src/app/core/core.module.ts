import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LivroService } from './../livros/livro.service';
import { AutorService } from './../autores/autor.service';
import { ErrorHandlerService } from './error-handler.service';

@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent
  ],
  exports: [NavbarComponent, NgxSpinnerModule],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    AutorService,
    LivroService,
    MessageService,
    ConfirmationService,
    ErrorHandlerService,
    NgxSpinnerService
  ]
})
export class CoreModule { }
