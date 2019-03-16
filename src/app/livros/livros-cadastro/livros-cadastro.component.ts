import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { MessageService, ConfirmationService } from 'primeng/api';

import { AutorService } from './../../autores/autor.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livros-cadastro',
  templateUrl: './livros-cadastro.component.html',
  styleUrls: ['./livros-cadastro.component.css']
})
export class LivrosCadastroComponent implements OnInit {

  form: FormGroup;
  autores = [];

  @Output() atualiza = new EventEmitter();
  @Input() display: boolean;
  @Input() idLivro: any;

  constructor(
    private formBuilder: FormBuilder,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService,
    private livroService: LivroService,
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.idLivro = this.route.snapshot.params.id;
    if (this.idLivro) {
      this.display = true;
      this.carregarLivro();
    } else {
      this.carregarAutores();
    }

  }

  configurarFormulario() {
    this.form = this.formBuilder.group({
      id: new FormControl(),
      titulo: new FormControl(),
      autor: new FormGroup({
        id: new FormControl()
      }),
      preco: new FormControl(),
      peso: new FormControl()
    });
  }

  carregarAutores() {
    this.autorService.getAutores()
      .then(autores => {
        this.autores = autores;
        this.autores = this.autores.map(a => ({
          label: a.nome, value: a.id
        }));
      })
      .catch(error => this.errorHandlerService.handle(error));
  }

  get editando() {
    return Boolean(this.form.get('id').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarLivro();
    } else {
      this.adicionar();
    }
    this.display = false;
  }

  cancelar() {
    this.display = false;
    this.form.reset();
    this.router.navigate(['/livros']);
  }

  showDialog() {
    if (this.idLivro != null) {
      this.carregarLivro();
    } else {
      this.novo();
    }
  }

  novo() {
    this.configurarFormulario();
  }

  carregarLivro() {
    this.livroService.carregarLivro(this.idLivro)
    .then((livro: any) => {
    this.form.patchValue(livro);
    this.carregarAutores();
  })
    .catch((error: any) => this.errorHandlerService.handle(error));
}

  atualizarLivro() {
    this.livroService.atualizar(this.form.value)
      .then(livro => {
        this.form.patchValue(livro);
        this.atualiza.emit();
        this.router.navigate(['/livros']);
        this.messageService.add({severity: 'success', detail: 'Livro alterado com sucesso!'});
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  adicionar() {
    this.livroService.addLivros(this.form.value)
    .then(() => {
    this.atualiza.emit();
    this.router.navigate(['/livros']);
    this.messageService.add({severity: 'success', detail: 'Livro cadastrado com sucesso!'});
  })
    .catch((error: any) => this.errorHandlerService.handle(error));
  }

  remover() {
    this.display = false;
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
      this.livroService.removerLivros(this.form.value)
      .then(() => {
        this.atualiza.emit();
        this.router.navigate(['/livros']);
        this.messageService.add({severity: 'success', detail: 'Livro excluído com sucesso!'});
      })
      .catch((error: any) => this.errorHandlerService.handle(error));
    },
      reject: () => {
        this.cancelar();
      }
    });
  }

}
