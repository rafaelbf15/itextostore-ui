import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { MessageService, ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AutorService } from './../autor.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-autores-pesquisa',
  templateUrl: './autores-pesquisa.component.html',
  styleUrls: ['./autores-pesquisa.component.css']
})
export class AutoresPesquisaComponent implements OnInit {

  autores = [];
  form: FormGroup;

  constructor(
    private autorService: AutorService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private ngxSpinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.carregarAutores();
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      nome: new FormControl()
    });
  }

  carregarAutores() {
    this.ngxSpinner.show();
    this.autorService.getAutores()
      .then((autores: any) => {
        this.autores = autores;
      });
    this.ngxSpinner.hide();
  }

  adicionar() {
    this.autorService.addAutores(this.form.value)
    .then(() => {
    this.carregarAutores();
    this.messageService.add({severity: 'success', detail: 'Autor cadastrado com sucesso!'});
    this.form.reset();
  })
    .catch((error: any) => this.errorHandlerService.handle(error));
  }

  excluir(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este autor?',
      accept: () => {
        this.autorService.remover(id)
          .then(() => {
            this.messageService.add({severity: 'success', detail: 'Autor excluído com sucesso!'});
            this.carregarAutores();
          })
          .catch((error: any) => this.errorHandlerService.handle(error));
      },
      reject: () => {}
    });
  }

  atualizar(autor: any) {
    this.autorService.atualizar(autor)
    .then(() => {
      this.carregarAutores();
      this.messageService.add({severity: 'success', detail: 'Autor alterado com sucesso!'});
    })
    .catch((error: any) => this.errorHandlerService.handle(error));
  }

}
